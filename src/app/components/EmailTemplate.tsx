import * as React from 'react';

interface EmailTemplateProps {
    name: string;
    date: string;
    count: number;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    name,
    date,
    count,
}) => (
    <div style={{ fontFamily: 'sans-serif', lineHeight: '1.5', color: '#333' }}>
        <h1 style={{ color: '#d9534f' }}>Sikeres foglalás!</h1>
        <p>Kedves {name}!</p>
        <p>Köszönjük, hogy jegyet foglaltál a <strong>Rágcsálóirtás</strong> előadásra.</p>
        <div style={{ background: '#f9f9f9', padding: '15px', borderRadius: '5px', margin: '20px 0' }}>
            <p style={{ margin: '5px 0' }}><strong>Dátum:</strong> {date}</p>
            <p style={{ margin: '5px 0' }}><strong>Időpont:</strong> Kapunyitás 18:40, Kezdés 19:00</p>
            <p style={{ margin: '5px 0' }}><strong>Jegyek száma:</strong> {count} db</p>
            <p style={{ margin: '5px 0' }}><strong>Helyszín:</strong> Katakomba Pinceszínház</p>
            <p style={{ margin: '5px 0' }}><strong>Cím:</strong> 1013 Budapest, Krisztina tér 4.</p>
            <p style={{ margin: '5px 0' }}><strong>Ár:</strong> Támogatói jegy ajánlott ára: 3000 Ft</p>
            <p style={{ margin: '15px 0 5px 0' }}><strong>Fizetési lehetőségek:</strong> A helyszínen készpénzzel vagy Revoluttal.</p>
        </div>
        <p>Szeretettel várunk!</p>
        <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '20px 0' }} />
        <small style={{ color: '#777' }}>Ez egy automatikus üzenet, kérjük ne válaszolj rá.</small>
    </div>
);
