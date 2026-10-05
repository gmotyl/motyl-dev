---
title: "Sześć stron z polskich danych publicznych, a wszystko zaczęło się od paczkomatu"
excerpt: "Jak jeden post na LinkedInie o czujnikach w paczkomatach InPostu zamienił się w stronę pogodową dla 140 miast, i czego to uczy o dzieleniu pracy między człowieka a agenta AI."
publishedAt: "2026-10-05"
slug: "paweljozefiak-polskie-dane-publiczne-szesc-stron-ai"
hashtags: "#joozio #ai #agents #opendata #engineering #generated #pl"
source_pattern: "PawelJozefiak"
---

## Sześć stron z danych publicznych, zbudowanych nocami przez agenta AI

**TLDR:** Autor opisuje, jak zbudował sześć stron internetowych opartych na polskich danych publicznych (ceny mieszkań, smog, wynagrodzenia, przetargi, a na końcu pogoda z czujników w paczkomatach InPost), korzystając z własnego agenta AI o imieniu Wiz, który wykonuje większość pracy w nocy, gdy autor śpi.

**Summary:** Historia zaczyna się od drobnego posta na LinkedInie: Jakub Mrugalski zauważył, że niektóre paczkomaty InPost mają w środku czujniki, a odczyty z nich są publiczne. Autor od razu skojarzył to z mapą pogody, bo tysiące paczkomatów rozsianych po polskich miastach to w istocie gotowa sieć termometrów, w większości zasilających tylko jedną aplikację. Dał krótki brief swojemu agentowi, Wizowi, i dzień później gotowa była strona pogody.jock.pl.

To szósta strona w rodzinie projektów, które zaczęły się od zupełnie innego pomysłu: śledzenia oświadczeń majątkowych polityków. Gdy się okazało, że jakglosuja.pl już to robi i robi to dobrze, autor zmienił kierunek na dane publiczne, które istnieją, ale nigdzie nie są pokazane w czytelnej formie. Powstała strona z cenami mieszkań deweloperów zestawionymi z danymi transakcyjnymi GUS, strona rankingująca smog w 145 miastach na podstawie stacji GIOŚ, strona z regionalnymi wskaźnikami ekonomicznymi i strona z przetargami publicznymi z unijnego rejestru TED. Piąta strona, odkrycia.jock.pl, łączy wszystkie cztery źródła naraz i wylicza, ile metrów kwadratowych mieszkania kupuje jedna pensja w danym mieście, co jest liczbą, której żadne pojedyncze źródło nie potrafi samo wyprodukować.

Najwięcej miejsca autor poświęca temu, jak trudno zbudować zaufanie do surowych danych z czujników. Termometr zamknięty w metalowej skrzynce w pełnym słońcu potrafi pokazać 30 stopni, gdy na ulicy jest 12. Żeby to obejść, Wiz dostał zestaw reguł: wartość miasta to mediana, nie średnia, żeby pojedyncze przegrzane czujniki nie zawyżały wyniku, czujnik cieplejszy o więcej niż 5 stopni od sąsiadów w promieniu 15 kilometrów traci swój odczyt temperatury i wilgotności, odczyty niezmienione przez 6 godzin są uznawane za zamrożone i odrzucane, a nowsze czujniki raportujące ciśnienie na wysokości własnego montażu są przeliczane do poziomu morza, żeby zgadzały się ze starszymi urządzeniami.

Autor jasno opisuje podział pracy: Jakub zauważył dane, on sam zdecydował, że produkt ma być o miastach, a nie o kolejnej ogólnokrajowej mapie cieplnej, i zażądał designu odróżniającego się od typowych dashboardów, a Wiz wykonał całą resztę, czyli pobieranie, czyszczenie, kod i wdrożenia. Usunięcie dowolnego z tych trzech elementów oznaczałoby, że strona by nie powstała.

**Key takeaways:**
- Mandatowe dane publiczne (jak ustawowy obowiązek publikacji cen deweloperów) są dobrym punktem startowym, bo ktoś musi je publikować regularnie i w ustalonym formacie.
- Warto sprawdzić dostępność API, zanim ktokolwiek zacznie scrapować stronę, bo API zwykle nie psuje się po cichu tak jak scraper.
- Każdy zestaw danych ma swój "termometr w pudełku w słońcu" i trzeba jawnie zdecydować, kiedy przestać mu ufać.

**Why do I care:** To praktyczny przykład tego, jak realnie wygląda dzisiaj podział pracy między człowiekiem a agentem AI w małym projekcie poza godzinami etatu: człowiek dostarcza kierunek, gust i nieufność wobec danych, agent dostarcza godziny pracy, których fizycznie nie da się wygospodarować po pracy z dzieckiem w domu. Dla zespołów rozważających własne wewnętrzne narzędzia na danych otwartych to też konkretna checklista pytań (czy jest API, kto musi to publikować, co zrobić z odstającymi odczytami), zanim ktokolwiek napisze pierwszą linijkę kodu.

**Link:** [I Turned Polish Public Data Into Six Websites. The Sixth Started With a Parcel Locker.](https://thoughts.jock.pl/p/public-data-ai-six-sites-poland-2026)
