import { google } from "googleapis";

export default async function hanlder(req, res) {
  const body = req.body;
  console.log(body);

  const sheetName = body.name;

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/spreadsheets",
      ],
    });

    const sheets = google.sheets({
      auth,
      version: "v4",
    });

    const createTabResponse = await sheets.spreadsheets.batchUpdate({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      requestBody: {
        requests: [
          {
            addSheet: {
              properties: {
                title: sheetName,
              },
            },
          },
        ],
      },
    });

    const insertDataResponse = await sheets.spreadsheets.values.batchUpdate({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      requestBody: {
        data: [
          {
            range: `${sheetName}!A1`,
            values: [Object.values(body)],
          },
        ],
        valueInputOption: "USER_ENTERED",
      },
    });

    console.log(`Data inserted into sheet ${sheetName}`);

    return res
      .status(200)
      .json({ message: "Sheet created and data inserted successfully" });
  } catch (err) {
    console.log("Failed with error %s", err.message);
    res
      .status(500)
      .json({ message: "An error occurred while creating the sheet" });
  }
}
