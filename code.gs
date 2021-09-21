function getComposeUI(e) {
  return [buildComposeCard(e)];
}

function buildComposeCard(e) {
  var card = CardService.newCardBuilder();
  var cardSection = CardService.newCardSection().setHeader('HTML Sender');

  var header = CardService.newCardHeader()
    .setTitle('HTML Sender')
    .setSubtitle('AddOn for Gmail to help sending HTML emails.')
    .setImageUrl('https://ssl.gstatic.com/docs/script/images/logo/script-64.png')

  var fixedFooter = CardService.newFixedFooter()
    .setPrimaryButton(
      CardService.newTextButton()
        .setText('Send HTML Email')
        .setOnClickAction(CardService.newAction()
          .setFunctionName('updateHtmlBody')));

  cardSection.addWidget(
    CardService.newTextInput()
      .setFieldName('htmlTextInput')
      .setMultiline(true)
      .setTitle('Message (HTML)')
      .setHint('Paste HTML code here'));

  return card.setHeader(header).setFixedFooter(fixedFooter).addSection(cardSection).build();
}

function updateHtmlBody(e) {
  var meta = e.draftMetadata;
  var subject = meta.subject.toString();
  var toRecipients = meta.toRecipients.toString();
  var ccRecipients = meta.ccRecipients.toString();
  var bccRecipients = meta.bccRecipients.toString();
  var emailBody = e.commonEventObject.formInputs.htmlTextInput.stringInputs.value[0];

  var response = CardService.newUpdateDraftActionResponseBuilder()
    .setUpdateDraftBodyAction(CardService.newUpdateDraftBodyAction()
      .addUpdateContent(
        subject,
        CardService.ContentType.MUTABLE_HTML)
      .setUpdateType(
        CardService.UpdateDraftBodyType.INSERT_AT_START
      ))
      .build()
  
  // Sending Email
  var msgObject = {
    to: toRecipients,
    cc: ccRecipients,
    bcc: bccRecipients,
    subject: subject,
    htmlBody: emailBody
  }
  sendEmail(msgObject);

  return response;
}

function sendEmail(msgObject) {
  MailApp.sendEmail(msgObject);
}
