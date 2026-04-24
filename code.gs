// আপনার যে ইমেইলে নোটিফিকেশন পেতে চান সেটি এখানে দিন
const TO_EMAIL = "YOUR_EMAIL@gmail.com"; 

function doPost(e) {
  try {
    // গুগল শিট অ্যাক্সেস করা
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // ফর্ম থেকে ডেটা রিসিভ করা
    const name = e.parameter.name;
    const email = e.parameter.email;
    const subject = e.parameter.subject;
    const message = e.parameter.message;
    const timestamp = new Date();
    
    // শিটে নতুন লাইন (Row) যুক্ত করা
    sheet.appendRow([timestamp, name, email, subject, message]);
    
    // সুন্দর HTML ফরম্যাটে ইমেইল তৈরি করা
    const emailSubject = "নতুন পোর্টফোলিও মেসেজ: " + subject;
    const emailBody = `
      <div style="font-family: Arial, sans-serif; color: #3E2723; background-color: #F9F6F0; padding: 20px; border-radius: 10px;">
        <h2 style="color: #8D6E63; border-bottom: 1px solid #D7CCC8; padding-bottom: 10px;">পোর্টফোলিও থেকে নতুন মেসেজ</h2>
        <p><strong>সময়:</strong> ${timestamp}</p>
        <p><strong>পাঠিয়েছে:</strong> ${name}</p>
        <p><strong>তার ইমেইল:</strong> ${email}</p>
        <p><strong>বিষয়:</strong> ${subject}</p>
        <div style="background-color: #fff; padding: 15px; border-radius: 8px; margin-top: 15px; border: 1px solid #D7CCC8;">
          <p style="margin: 0;"><strong>মেসেজ:</strong><br><br>${message}</p>
        </div>
      </div>
    `;
    
    // আপনার জিমেইলে ফরওয়ার্ড করা
    MailApp.sendEmail({
      to: TO_EMAIL,
      subject: emailSubject,
      htmlBody: emailBody,
      replyTo: email
    });
    
    // সাকসেস রেসপন্স পাঠানো
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // এরর রেসপন্স
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}