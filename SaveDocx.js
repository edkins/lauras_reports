import * as FileSystem from 'expo-file-system'
import * as docx from 'docx';
import { exportDateTimeForFilename } from './Utils';
import * as Sharing from 'expo-sharing';

export async function shareDocx() {
    const table = new docx.Table({
    rows: [
        new docx.TableRow({
        children: [
            new docx.TableCell({
            children: [new docx.Paragraph('Cell 1')]
            }),
            new docx.TableCell({
            children: [new docx.Paragraph('Cell 2')]
            })
        ]
        }),
        new docx.TableRow({
        children: [
            new docx.TableCell({
            children: [new docx.Paragraph('Cell 3')]
            }),
            new docx.TableCell({
            children: [new docx.Paragraph('Cell 4')]
            })
        ]
        })
    ]
    });

    const doc = new docx.Document({
    sections: [
        {
        children: [table]
        }
    ]
    });

    const buffer = await docx.Packer.toBase64String(doc);
    const filename = `report-${exportDateTimeForFilename(new Date().toISOString())}.docx`;
    const fileUri = `${FileSystem.cacheDirectory}/${filename}`;
    await FileSystem.writeAsStringAsync(fileUri, buffer, {encoding:'base64'});
    await Sharing.shareAsync(
        fileUri,
        {
            mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        });
}
