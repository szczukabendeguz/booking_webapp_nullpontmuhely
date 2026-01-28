import BookingForm from "./components/BookingForm";

export default function Home() {
  return (
    <main className="min-vh-100 d-flex flex-column align-items-center">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8 col-xl-6">
            <img src="/rágcsálóírtás_szinezett_0002_0000s_0004_nullpont.png" alt="" className="w-100 mb-3" />
            <img src="/rágcsálóírtás_szinezett_0002_0000s_0005_Rágcsálóirtás.png" alt="" className="w-100 mb-3" />
            <img src="/rágcsálóírtás_szinezett_0002_0000s_0003_agatha-kriszti-című.png" alt="" className="w-100 mb-4" />
            <BookingForm />
            <div className="text-center mt-4 text-white-50">
              <p className="mb-1">Helyszín: Katakomba Pinceszínház</p>
              <p className="mb-1">Cím: 1013 Budapest, Krisztina tér 4.</p>
              <p className="mb-1">Kezdés: 19:00 (Kapunyitás: 18:40)</p>
              <p className="mb-0">Támogatói jegy ajánlott ára: 3000 Ft</p>
            </div>
          </div>
        </div>
      </div>
      <footer className="w-100 mt-auto py-3 text-center">
        <div className="container">
          <a
            href="/adatkezelesi_tajekoztato.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white-50"
          >
            Adatkezelési tájékoztató
          </a>
        </div>
      </footer>
    </main>
  );
}
