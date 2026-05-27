// ══════════════════════════════════════════════════════════════
//  Chasing 42K · Runner Survey — Google Apps Script Backend
//  Deploy as: Web App → Execute as: Me → Access: Anyone
// ══════════════════════════════════════════════════════════════

var SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';  // ← paste your Sheet ID here

var HEADERS = [
  'Timestamp',
  'A1 Nationality',
  'A2 Age Group',
  'A3 Running Experience',
  'A4 Marathons Completed',
  'A5 Run in Taiwan',
  'B1 Attractions',
  'B1 Other (detail)',
  'B2 Biggest Barrier',
  'B2 Comments',
  'B3 Word / Phrase',
  'C1 EP01 Rating',
  'C2 EP02 Rating',
  'C3 EP03 Rating',
  'C4 EP04 Rating',
  'C5 EP05 Rating',
  'C6 EP06 Rating',
  'C7 EP07 Rating',
  'C8 EP08 Rating',
  'C9 Rank 1st',
  'C9 Rank 2nd',
  'C9 Rank 3rd',
  'D1 Video Length',
  'D2 Platforms',
  'D3 Hooks',
  'E1 Uniquely Taiwan',
  'E2 One Episode Choice',
  'E3 Missed Story Angle',
  'F1 Would Watch',
  'F2 Would Share',
  'F3 Taiwan as Destination',
];

function doPost(e) {
  try {
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getSheets()[0];

    // Write headers on first run if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length)
        .setFontWeight('bold')
        .setBackground('#c0392b')
        .setFontColor('#ffffff');
      sheet.setFrozenRows(1);
    }

    var data = JSON.parse(e.postData.contents);

    var row = [
      data.timestamp         || new Date().toISOString(),
      data.a1_nationality    || '',
      data.a2_age            || '',
      data.a3_experience     || '',
      data.a4_marathons      || '',
      data.a5_taiwan         || '',
      data.b1_attractions    || '',
      data.b1_other_detail   || '',
      data.b2_barrier        || '',
      data.b2_comments       || '',
      data.b3_word           || '',
      data.c1_ep01           || '',
      data.c2_ep02           || '',
      data.c3_ep03           || '',
      data.c4_ep04           || '',
      data.c5_ep05           || '',
      data.c6_ep06           || '',
      data.c7_ep07           || '',
      data.c8_ep08           || '',
      data.c9_rank1          || '',
      data.c9_rank2          || '',
      data.c9_rank3          || '',
      data.d1_video_length   || '',
      data.d2_platforms      || '',
      data.d3_hooks          || '',
      data.e1_unique_taiwan  || '',
      data.e2_one_episode    || '',
      data.e3_missed_story   || '',
      data.f1_watch          || '',
      data.f2_share          || '',
      data.f3_destination    || '',
    ];

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handles preflight OPTIONS request (not strictly needed for no-cors but included for completeness)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'Chasing 42K Survey API is live' }))
    .setMimeType(ContentService.MimeType.JSON);
}
