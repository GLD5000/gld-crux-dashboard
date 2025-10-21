import fs from 'fs';
import path from 'path';

async function fetchCrUXData(websiteUrl, formFactor) {
    const apiKey = process.env.GOOGLE_API_KEY;

    if (!apiKey) {
        throw new Error('Google API Key is not set');
    }

    const requestUrl = `https://chromeuxreport.googleapis.com/v1/records:queryHistoryRecord?key=${apiKey}`;
    try {
        const requestBody = {
            origin: websiteUrl,
            formFactor,
            // metrics: [
            //     'experimental_time_to_first_byte',
            //     'first_contentful_paint',
            //     'largest_contentful_paint',
            //     // 'first_input_delay',
            //     'cumulative_layout_shift',
            //     // 'experimental_interaction_to_next_paint',
            // ],
        };

        const response = await fetch(requestUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
            const errorText = await response.text();
            console.error('Error details:', errorText);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching CRUX data:', error.message);
        if (error instanceof Error && error.message.includes('HTTP error')) {
            console.error('API Response:', error.message.split('status: ')[1]);
        }
    }
}

async function multiFormCruxAPI(websiteUrl) {
    const formFactorArray = [undefined, 'PHONE', 'TABLET', 'DESKTOP'];
    const returnArray = [];
    for (let i = 0; i < formFactorArray.length; i += 1) {
        const data = await fetchCrUXData(websiteUrl, formFactorArray[i]);
        returnArray.push(data);
    }
    return returnArray;
}

const urlArray = ['https://www.amazon.co.uk/', 'https://www.amazon.com/'];

for (let i = 0; i < urlArray.length; i += 1) {
    const outputPath = path.join(
        process.cwd(),
        'public',
        'crux-history',
        `${urlArray[i].replace('https://www.', '').replaceAll('.', '_').replace('/', '')}.json`
    );

    const outputData = await multiFormCruxAPI(urlArray[i]);
    fs.writeFileSync(outputPath, JSON.stringify(outputData));
}
