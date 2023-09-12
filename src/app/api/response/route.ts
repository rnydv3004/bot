import { NextRequest, NextResponse } from "next/server";

const { containerBootstrap } = require('@nlpjs/core');
const { Nlp } = require('@nlpjs/nlp');
const { LangEn } = require('@nlpjs/lang-en-min');

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json()
        const { message } = reqBody

        // const nlp = new Nlpnlp({ languages: ['en'], forceNER: true, nlu: { log: true } });

        const container = await containerBootstrap();
        container.use(Nlp);
        container.use(LangEn);
        const nlp = container.get('nlp');
        nlp.settings.autoSave = false;
        nlp.addLanguage('en');

        // Adds the utterances and intents for the NLP
        nlp.addDocument('en', 'goodbye for now', 'greetings.bye');
        nlp.addDocument('en', 'bye bye take care', 'greetings.bye');
        nlp.addDocument('en', 'okay see you later', 'greetings.bye');
        nlp.addDocument('en', 'bye for now', 'greetings.bye');
        nlp.addDocument('en', 'i must go', 'greetings.bye');
        nlp.addDocument('en', 'hello', 'greetings.hello');
        nlp.addDocument('en', 'hi', 'greetings.hello');
        nlp.addDocument('en', 'howdy', 'greetings.hello');

        //taxmechanic.about
        nlp.addDocument('en', 'about you', 'taxmechanic.about');
        nlp.addDocument('en', 'about Taxmechanic', 'taxmechanic.about');
        nlp.addDocument('en', 'Taxmechanic', 'taxmechanic.about');
        nlp.addDocument('en', 'what is taxmechanic', 'taxmechanic.about');
        nlp.addDocument('en', 'Concerning Taxmechanic', 'taxmechanic.about');
        nlp.addDocument('en', 'Regarding Taxmechanic', 'taxmechanic.about');
        nlp.addDocument('en', 'In relation to Taxmechanic', 'taxmechanic.about');
        nlp.addDocument('en', 'Pertaining to Taxmechanic', 'taxmechanic.about');
        nlp.addDocument('en', 'With respect to Taxmechanic', 'taxmechanic.about');
        nlp.addDocument('en', "About Taxmechanic's services", 'taxmechanic.about');
        nlp.addDocument('en', "Taxmechanic's details", 'taxmechanic.about');
        nlp.addDocument('en', "Taxmechanic's information", 'taxmechanic.about');
        nlp.addDocument('en', "Taxmechanic's offerings", 'taxmechanic.about');
        nlp.addDocument('en', "Taxmechanic's profile", 'taxmechanic.about');

        // Train also the NLG
        nlp.addAnswer('en', 'greetings.bye', 'Till next time');
        nlp.addAnswer('en', 'greetings.bye', 'see you soon!');
        nlp.addAnswer('en', 'greetings.hello', 'Hey there!');
        nlp.addAnswer('en', 'greetings.hello', 'Greetings!');

        nlp.addAnswer('en', 'taxmechanic.about', 'Taxmechanic is a boutique accounting firm in Toronto, Canada. We strive to provide clarity and guide our clients towards financial success, acting as a beacon to navigate the complexities of the tax landscape.');
        nlp.addAnswer('en', 'taxmechanic.about', "Taxmechanic, a boutique accounting firm in Toronto, Canada, aims to illuminate the tax landscape and steer clients toward financial success.");
        nlp.addAnswer('en', 'taxmechanic.about', "Taxmechanic, located in Toronto, Canada, is a boutique accounting firm dedicated to shedding light on the intricacies of taxation and leading clients toward financial prosperity.");
        nlp.addAnswer('en', 'taxmechanic.about', "In Toronto, Canada, Taxmechanic, a boutique accounting firm, serves as a guiding light, helping clients navigate the intricacies of tax matters for financial success.");
        nlp.addAnswer('en', 'taxmechanic.about', "Taxmechanic, a boutique accounting firm in Toronto, Canada, acts as a guiding beacon in the complex world of taxes, aiming to ensure clients' financial success.");
        nlp.addAnswer('en', 'taxmechanic.about', "Based in Toronto, Canada, Taxmechanic is a boutique accounting firm that aspires to bring clarity to the tax landscape and lead clients to financial success.");

        // Train and save the model.


        await nlp.train();
        const response = await nlp.process('en', message);
        console.log(response.answer);
        // const res = NextResponse.json({ message: response }, { status: 202 })
        // console.log("The res is:", res.json())
        const answer = response.answer;
        console.log("Var an is:", answer);
        return NextResponse.json({ message: answer }, { status: 202 })



        // return NextResponse.json({ message: "success" }, { status: 202 })


    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function GET() {
    try {

        const response = NextResponse.json({
            message: "Success",
            success: true
        })

        return response


    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}