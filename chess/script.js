// Each piece SVG uses viewBox="0 0 45 45" — standard chess piece coordinate space
// No scaling transforms needed; the .sq svg { width/height: 78% } handles display size
function piece(type, fill, stroke) {
    const sw = 1.5;
    const defs = {
      pawn: `<circle cx="22.5" cy="9" r="4"/>
        <path d="M22.5 13c-3.5 0-6 2-6 5 0 2.2 1.3 4 3.5 5C15 24.5 12 28 12 33h21c0-5-3-8.5-8-10.5 2.2-1 3.5-2.8 3.5-5 0-3-2.5-5-6-5z"/>
        <path d="M11 36.5h23v2H11z"/>`,
  
      rook: `<path d="M9 39h27v-3H9zM12 36V22h21v14zM11 14V9h4v2h5V9h5v2h5V9h4v5l-3 3H14l-3-3z"/>
        <path d="M14 22h17"/>`,
  
      bishop: `<circle cx="22.5" cy="7" r="2.5"/>
        <path d="M22.5 9.5c-6 6-4.5 16-1 20h2c3.5-4 5-14-1-20z"/>
        <path d="M14.5 31.5c2 2 11 2 16 0v-1c-2 1.5-12 1.5-16 0v1z"/>
        <path d="M10 38.5h25v-2.5H10zM11 36h23v-2H11z"/>`,
  
      knight: `<path d="M16 36c0-3 2-5 6-7 5-2.5 8-7 7-14-1-5-4.5-9-10-10l-1 4c3 1 5 3 5.5 6 .5 4-2 7-6 8.5-4 1.5-5 4-5 7v5.5h17V36H16z"/>
        <path d="M11 28.5c2-1 6-3 7-7"/>
        <path d="M14 14c-2 3-1 7 2 8"/>
        <circle cx="17" cy="12" r="1.5"/>
        <path d="M10 38.5h25v-2H10z"/>`,
  
      queen: `<circle cx="6.5" cy="13" r="2.5"/><circle cx="14" cy="9.5" r="2.5"/>
        <circle cx="22.5" cy="8" r="2.5"/><circle cx="31" cy="9.5" r="2.5"/>
        <circle cx="38.5" cy="13" r="2.5"/>
        <path d="M7 26.5c7-8 14-4 15.5 1.5L37 13 30.5 29H14.5L8 13z"/>
        <path d="M7 26.5c0 2 1.5 2.5 2.5 4.5s.5 2 0 4c-1 1-1.5 2-1.5 2 -1.5 1.5.5 2.5.5 2.5 6 2.5 14 2.5 19.5 0 0 0 2-1 .5-2.5 0 0-1-1-1.5-2-.5-2-.5-2 0-4 1-2 2.5-2.5 2.5-4.5"/>
        <path d="M11 31.5c4-1 19-1 23 0M11.5 35c4-1.5 17.5-1.5 22 0"/>
        <path d="M10 38.5h25v-2H10z"/>`,
  
      king: `<path d="M22.5 6v6M20 9h5" stroke-width="1.5"/>
        <path d="M22.5 21s3.5-6 2.5-9c0 0-1-2-2.5-2s-2.5 2-2.5 2c-1 3 2.5 9 2.5 9"/>
        <path d="M11.5 37c5 3 15 3 20.5 0v-6.5s8-4 5.5-10c-3.5-5.5-12-3-14.5 3.5V20s-5-13-13 0c-2.5 5.5 4.5 9.5 4.5 9.5V37z"/>
        <path d="M11.5 30c5-2.5 15-2.5 21 0M11.5 33.5c5-2.5 15-2.5 21 0M11.5 37c5-2.5 15-2.5 21 0"/>`,
    };
    const body = defs[type] || '';
    return `<svg viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg">
      <g fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">
        ${body}
      </g></svg>`;
  }
  
  const W = '#ffffff', B = '#111111';
  const PIECE_SVG = {
    Wpawn:   piece('pawn',   W, B), Bpawn:   piece('pawn',   B, W),
    Wrook:   piece('rook',   W, B), Brook:   piece('rook',   B, W),
    Wbishop: piece('bishop', W, B), Bbishop: piece('bishop', B, W),
    Wknight: piece('knight', W, B), Bknight: piece('knight', B, W),
    Wqueen:  piece('queen',  W, B), Bqueen:  piece('queen',  B, W),
    Wking:   piece('king',   W, B), Bking:   piece('king',   B, W),
  };
  
  const INIT = {
    801:'Brook',  802:'Bknight', 803:'Bbishop', 804:'Bqueen',
    805:'Bking',  806:'Bbishop', 807:'Bknight', 808:'Brook',
    701:'Bpawn',702:'Bpawn',703:'Bpawn',704:'Bpawn',
    705:'Bpawn',706:'Bpawn',707:'Bpawn',708:'Bpawn',
    201:'Wpawn',202:'Wpawn',203:'Wpawn',204:'Wpawn',
    205:'Wpawn',206:'Wpawn',207:'Wpawn',208:'Wpawn',
    101:'Wrook',102:'Wknight',103:'Wbishop',104:'Wqueen',
    105:'Wking',106:'Wbishop',107:'Wknight',108:'Wrook',
  };
  
  const state = {}, squares = {};
  
  const boardEl = document.getElementById('board');
  for (let row = 8; row >= 1; row--) {
    for (let col = 1; col <= 8; col++) {
      const id = row * 100 + col;
      const sq = document.createElement('div');
      sq.className = 'sq';
      sq.dataset.id = String(id);
      sq.style.background = (row + col) % 2 !== 0 ? 'var(--light)' : 'var(--dark)';
      boardEl.appendChild(sq);
      squares[id] = sq;
      state[id] = INIT[id] || '';
    }
  }
  
  function render() {
    for (const [id, piece] of Object.entries(state))
      squares[parseInt(id)].innerHTML = piece ? (PIECE_SVG[piece] || '') : '';
  }
  
  function boxId(r, c) { return (r<1||r>8||c<1||c>8) ? null : r*100+c; }
  
  function slide(row, col, dr, dc, my) {
    const ids = [];
    for (let i = 1; i <= 7; i++) {
      const id = boxId(row+dr*i, col+dc*i);
      if (id === null) break;
      if (!state[id]) { ids.push(id); }
      else { if (state[id][0] !== my) ids.push(id); break; }
    }
    return ids;
  }
  
  function step1(row, col, dr, dc, my) {
    const id = boxId(row+dr, col+dc);
    if (id === null) return [];
    if (!state[id] || state[id][0] !== my) return [id];
    return [];
  }
  
  function getMoves(id) {
    const piece = state[id]; if (!piece) return [];
    const my = piece[0], row = Math.floor(id/100), col = id%100, type = piece.slice(1), moves = [];
    if (type === 'pawn') {
      const dir = my==='W'?1:-1, start = my==='W'?2:7;
      const fwd = boxId(row+dir, col);
      if (fwd !== null && !state[fwd]) {
        moves.push(fwd);
        if (row === start) { const f2=boxId(row+dir*2,col); if(f2!==null&&!state[f2]) moves.push(f2); }
      }
      for (const dc of [-1,1]) { const d=boxId(row+dir,col+dc); if(d!==null&&state[d]&&state[d][0]!==my) moves.push(d); }
    }
    else if (type==='rook')   for (const [dr,dc] of [[1,0],[-1,0],[0,1],[0,-1]]) moves.push(...slide(row,col,dr,dc,my));
    else if (type==='bishop') for (const [dr,dc] of [[1,1],[1,-1],[-1,1],[-1,-1]]) moves.push(...slide(row,col,dr,dc,my));
    else if (type==='queen')  for (const [dr,dc] of [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]) moves.push(...slide(row,col,dr,dc,my));
    else if (type==='king')   for (const [dr,dc] of [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]) moves.push(...step1(row,col,dr,dc,my));
    else if (type==='knight') for (const [dr,dc] of [[2,1],[2,-1],[-2,1],[-2,-1],[1,2],[1,-2],[-1,2],[-1,-2]]) moves.push(...step1(row,col,dr,dc,my));
    return moves;
  }
  
  let tog=1, selectedId=null, validMoves=[];
  
  function updateLabel() {
    const el=document.getElementById('turn-label');
    if (tog%2!==0) { el.textContent="White's turn"; el.style.color='#e8d5b0'; }
    else           { el.textContent="Black's turn";  el.style.color='#7aaccf'; }
  }
  function clearHL() { Object.values(squares).forEach(sq=>sq.classList.remove('sel','cap','dot')); }
  function selectSq(id) {
    clearHL(); selectedId=id; validMoves=getMoves(id);
    squares[id].classList.add('sel');
    validMoves.forEach(mid => squares[mid].classList.add(state[mid]?'cap':'dot'));
  }
  function checkWin() {
    let wk=false, bk=false;
    for (const p of Object.values(state)) { if(p==='Wking')wk=true; if(p==='Bking')bk=true; }
    if (!wk||!bk) setTimeout(()=>{ alert(`${wk?'White':'Black'} wins!`); location.reload(); },100);
  }
  
  boardEl.addEventListener('click', e => {
    const sqEl=e.target.closest('.sq'); if(!sqEl) return;
    const id=parseInt(sqEl.dataset.id);
    if (selectedId!==null && validMoves.includes(id)) {
      state[id]=state[selectedId]; state[selectedId]='';
      render(); clearHL(); selectedId=null; validMoves=[]; tog++; updateLabel(); checkWin();
      return;
    }
    const myTeam=tog%2!==0?'W':'B';
    if (state[id]&&state[id][0]===myTeam) {
      if (selectedId===id) { clearHL(); selectedId=null; validMoves=[]; }
      else selectSq(id);
      return;
    }
    clearHL(); selectedId=null; validMoves=[];
  });
  
  render();
  updateLabel();
  