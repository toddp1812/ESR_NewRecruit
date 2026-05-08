
function toCommanderProfiles(Data) {
    const model = {
        parentKey: "profiles",
        name: Data.Commander,
        typeName: "Commander",
        typeId: "pt-commander",
        characteristics: [
            {typeId: "ct-availability-formation", $text: Data.AvailabilityFormation},
            {typeId: "ct-availability-force", $text: Data.AvailabilityForce},
            {typeId: "ct-availability-army", $text: Data.AvailabilityArmy},
            {typeId: "ct-command", $text: Data.Command},
            {typeId: "ct-ranged-far", $text: Data.RangedFar},
            {typeId: "ct-ranged-near", $text: Data.RangedNear},
            {typeId: "ct-contact", $text: Data.Contact},
            {typeId: "ct-cohesion" ,$text: Data.Cohesion}
        ],
    }

    const traits = Data.Traits?.map(Trait => ({
        parentKey: "profiles",
        name: Trait.name,
        typeId: "pt-traits",
        typeName: "Traits",
        hidden: false,
        characteristics: [
            {
                typeId: "ct-trait-desc",
                $text: Trait.desc
            }
        ],
}))
    return [model, ...traits]  
}
function lastItem(array) {
  return array[array.length - 1];
}

export default {
  name: "[ESR 1] Paste Commander",
  hooks: {
    paste(e, payload) {
      if (typeof payload !== "string") return
        const re = /^\s*(.+?)\s+([\s\S]+?)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\b([\s\S]*)/m;
        const m = re.exec(payload);
        if (!m) return;

        const [_, Commander, RawAvailability, Command, RangedFar, RangedNear, Contact, Cohesion, RawTraits] = m;
        const [AvailabilityFormation, AvailabilityForce, AvailabilityArmy] = splitAvailability(RawAvailability)
        const Traits = parseTraits(RawTraits)
        console.log(RawTraits, Traits)
        const Data = {
            Commander, AvailabilityFormation, AvailabilityForce, AvailabilityArmy, Command, RangedFar, RangedNear, Contact, Cohesion, Traits
        }
        return toCommanderProfiles(Data);

        function splitAvailability(s) {
            const TOKENS = [
                "Revolution","Early","Early War","Early Wars",
                "Mid","Mid War","Mid Wars",
                "Late","Late War","Late Wars","-"
            ];

            function tokenize(text) {
                text = String(text || '').replace(/^[\r\n]+/, '').replace(/[\r\n]+/g, ' ').trim();
                if (!text) return [];
                const sorted = TOKENS.slice().sort((a, b) => b.length - a.length);
                const esc = t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const re = new RegExp(sorted.map(esc).join('|'), 'gi');
                const map = new Map(TOKENS.map(t => [t.toLowerCase(), t]));
                const out = [];
                let m;
                while ((m = re.exec(text)) !== null) out.push(map.get(m[0].toLowerCase()) || m[0]);
                return out;
            }

            function isFollowing(prevIdx, idx) {
                return idx > prevIdx;
            }

            const tokens = tokenize(s);
            if (!tokens.length) return [null, null, null];

            const cols = [[], [], []];
            let col = 0;
            let lastIdx = -1;

            for (const tok of tokens) {
                const idx = TOKENS.indexOf(tok);
                if (isFollowing(lastIdx, idx)) {
                cols[col].push(tok);
                } else {
                col = Math.min(col + 1, 2);
                cols[col].push(tok);
                }
                lastIdx = idx;
            }

            return cols.map(c => (c.length ? c.join(', ') : null));
        }


        function parseTraits(raw) {
            if (!raw) return [];

            const cleanName = s => String(s || '')
                .replace(/^[\s"']+|[\s"']+$/g, '') 
                .replace(/\s+/g, ' ')
                .trim();

            const cleanDesc = s => {
                let d = String(s || '').replace(/\r/g, ''); // normalize CRLF
                // preserve internal newlines but trim leading/trailing whitespace/newlines
                d = d.replace(/^\s+/, '').replace(/\s+$/, '');
                // replace newlines with spaces
                d = d.replace(/\n{1,}/g, ' ');
                return d;
            };

            // Find all "name;" occurrences that start at beginning or right after a newline.
            const nameRe = /(?:^|\n)\s*([^\n;]{1,120}?)\s*;\s*/g;
            const matches = [...raw.matchAll(nameRe)];
            if (!matches.length) return [];

            const results = [];
            for (let i = 0; i < matches.length; i++) {
                const m = matches[i];
                const nameRaw = m[1];
                const name = cleanName(nameRaw);
                if (!name) continue;

                const descStart = m.index + m[0].length;
                const nextMatch = matches[i + 1];
                const descEnd = nextMatch ? nextMatch.index : raw.length;
                const descRaw = raw.slice(descStart, descEnd);
                const desc = cleanDesc(descRaw);

                results.push({ name, desc });
            }
            return results;
        }
    }
  }
}