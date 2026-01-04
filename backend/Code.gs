
/**
 * BACKEND: Google Apps Script Web App for KGOF 30th State Conference
 */

const CONFIG = {
  MASTER_SHEET_ID: '1_GqYP_rkgWyaCjxW5S5k3XvqsHv8-mfbbX2i6VtaRmU', 
  ADMIN_PIN: '1234'                 
};

function doGet(e) {
  const action = e.parameter.action;
  const ss = SpreadsheetApp.openById(CONFIG.MASTER_SHEET_ID);
  
  try {
    switch(action) {
      case 'getDelegates':
        return jsonResponse(getDelegatesByDistrict(ss, e.parameter.district));
      case 'markPresence':
        return jsonResponse(markPresence(ss, e.parameter.id));
      case 'getSchedule':
        return jsonResponse(getSchedule(ss));
      case 'getStats':
        if (e.parameter.pin !== CONFIG.ADMIN_PIN) return jsonResponse({error: 'Invalid PIN'});
        return jsonResponse(getStats(ss));
      default:
        return jsonResponse({error: 'Invalid action'});
    }
  } catch (err) {
    return jsonResponse({error: err.toString(), success: false});
  }
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.openById(CONFIG.MASTER_SHEET_ID);
    if (data.action === 'submitCredential') {
      return jsonResponse(submitCredential(ss, data));
    }
    return jsonResponse({error: 'Invalid post action'});
  } catch (err) {
    return jsonResponse({error: err.toString(), success: false});
  }
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function getSchedule(ss) {
  const sheet = ss.getSheetByName('Schedule');
  if (!sheet) return [];
  const data = sheet.getDataRange().getValues();
  if (data.length < 2) return [];
  
  const headers = data.shift();
  const dateIdx = headers.indexOf('Date');
  const timeIdx = headers.indexOf('Time');
  const eventIdx = headers.indexOf('Event');
  const speakerIdx = headers.indexOf('Speaker');
  const desigIdx = headers.indexOf('Designation');
  const venueIdx = headers.indexOf('Venue');

  return data.map(row => ({
    date: row[dateIdx] || '',
    time: row[timeIdx] || '',
    event: row[eventIdx] || '',
    speaker: row[speakerIdx] || '',
    speakerDesignation: desigIdx !== -1 ? row[desigIdx] : '',
    venue: row[venueIdx] || ''
  }));
}

function getDelegatesByDistrict(ss, district) {
  const sheet = ss.getSheetByName('Delegates');
  if (!sheet) return [];
  const data = sheet.getDataRange().getValues();
  if (data.length < 2) return [];
  const headers = data.shift();
  const idIdx = headers.indexOf('ID');
  const nameIdx = headers.indexOf('Name');
  const districtIdx = headers.indexOf('District');
  const roleIdx = headers.indexOf('Position held in KGOF');
  const presenceIdx = headers.indexOf('Present');
  if (idIdx === -1 || districtIdx === -1) return [];
  const searchDist = district ? district.trim().toUpperCase() : '';
  return data
    .filter(row => row[districtIdx]?.toString().trim().toUpperCase() === searchDist)
    .map(row => ({
      id: row[idIdx]?.toString() || '',
      name: nameIdx !== -1 ? row[nameIdx] : '',
      district: districtIdx !== -1 ? row[districtIdx] : '',
      role: roleIdx !== -1 ? row[roleIdx] : '',
      isPresent: presenceIdx !== -1 ? !!row[presenceIdx] : false
    }));
}

function markPresence(ss, id) {
  const sheet = ss.getSheetByName('Delegates');
  const data = sheet.getDataRange().getValues();
  const headers = data.shift();
  const idIdx = headers.indexOf('ID');
  const presenceIdx = headers.indexOf('Present') + 1;
  const targetId = id ? id.trim() : '';
  for (let i = 0; i < data.length; i++) {
    if (data[i][idIdx]?.toString().trim() === targetId) {
      if (data[i][presenceIdx-1]) return {success: true, message: 'Already marked.'};
      sheet.getRange(i + 2, presenceIdx).setValue(new Date());
      return {success: true};
    }
  }
  return {success: false, message: 'ID not found.'};
}

function getStats(ss) {
  const sheet = ss.getSheetByName('Delegates');
  if (!sheet) return { total: 0, present: 0, byDistrict: {}, recent: [] };
  const data = sheet.getDataRange().getValues();
  const headers = data.shift();
  const presenceIdx = headers.indexOf('Present');
  const districtIdx = headers.indexOf('District');
  const nameIdx = headers.indexOf('Name');
  const stats = { total: data.length, present: 0, byDistrict: {}, recent: [] };
  data.forEach(row => {
    if (presenceIdx !== -1 && !!row[presenceIdx]) {
      stats.present++;
      const dist = row[districtIdx] || 'Unknown';
      stats.byDistrict[dist] = (stats.byDistrict[dist] || 0) + 1;
      stats.recent.push({ name: row[nameIdx] || 'Anonymous', timestamp: row[presenceIdx].toString() });
    }
  });
  stats.recent.sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  stats.recent = stats.recent.slice(0, 15);
  return stats;
}
