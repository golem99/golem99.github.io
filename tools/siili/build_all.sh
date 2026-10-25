set -e
cd /home/claude/golem99/golem99.github.io/appar/siili
git checkout -q b88072c03154e46619d3f73cae1b68e7285532db -- index.html
python3 /home/claude/siili-work/apply_home.py index.html /home/claude/siili-work/new_home.js
python3 /home/claude/siili-work/apply_biped.py index.html
python3 /home/claude/siili-work/apply_face.py index.html /home/claude/siili-work/face.js
python3 /home/claude/siili-work/apply_door.py index.html /home/claude/siili-work/door.js
python3 /home/claude/siili-work/apply_perf.py index.html /home/claude/siili-work/perf.js
python3 /home/claude/siili-work/apply_film.py index.html /home/claude/siili-work/film.js
python3 /home/claude/siili-work/apply_ch2.py index.html /home/claude/siili-work/ch2.js
python3 /home/claude/siili-work/bleed.py /home/claude/siili-work/siili-biped.glb >/dev/null || true
cp /home/claude/siili-work/siili-biped.glb /home/claude/siili-work/face-mouth.png /home/claude/siili-work/face-eye_r.png /home/claude/siili-work/face-eye_l.png .
node -e "const s=require('fs').readFileSync('index.html','utf8');const m=s.match(/<script type=\"module\">([\s\S]*?)<\/script>/);const code=m[1].replace(/^import .*$/mg,'');try{new (Object.getPrototypeOf(async function(){}).constructor)(code);console.log('syntax ok')}catch(e){console.log('SYNTAX ERR',e.message);process.exit(1)}"

# Kapitel 6–10 (2026-10-25): lägg på efter allt ovan
# python3 apply_ch6.py index.html ch6.js
