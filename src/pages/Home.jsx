
import { useState } from 'react';
import { Link } from 'react-router-dom';
import FeaturedCarousel from '../components/FeaturedCarousel';
import { movies as localMovies } from '../data/data';

const STEPS = [
  {
    n: 1,
    file: 'src/api/tmdb.js',
    what: 'เขียนส่วน fetch ใน getJSON',
  },
  {
    n: 2,
    file: 'src/api/tmdb.js',
    what: 'เขียน toMovie แปลง JSON ของ TMDB',
  },
  {
    n: 3,
    file: 'src/pages/Movies.jsx',
    what: 'useEffect โหลดหนังจาก API แล้วกรองในเครื่อง',
  },
  {
    n: 4,
    file: 'src/pages/MovieDetail.jsx',
    what: 'โหลดรายละเอียดหนังตาม id',
  },
  {
    n: 5,
    file: 'src/pages/Home.jsx',
    what: 'หนังแนะนำสุ่มจากข้อมูล API ชุดเดียวกัน',
  },
  {
    n: 6,
    file: 'docs/api-wishlist.md',
    what: 'กรอกรายการ API ที่จะขอจากทีม Backend',
  },
];

// สุ่มลำดับโดยไม่แก้ไข Array ต้นฉบับ
function shuffle(list) {
  if (!Array.isArray(list)) {
    return [];
  }

  const copy = [...list];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

function Home() {
  // ตรวจสอบข้อมูลจาก data.js ก่อนนำไปใช้
  const safeMovies = Array.isArray(localMovies)
    ? localMovies
    : [];

  // สุ่มครั้งแรกเมื่อเปิดหน้า
  const [picks, setPicks] = useState(() =>
    shuffle(safeMovies)
  );

  // สุ่มหนังใหม่เมื่อกดปุ่ม
  const handleShuffle = () => {
    setPicks(current => shuffle(current));
  };

  return (
    <div className="mx-auto max-w-5xl px-4 md:px-6">
      {/* Hero */}
      <section className="py-14 md:py-20">
        <p className="text-sm font-medium text-emerald-600">
          สัปดาห์นี้: Fetch / JSON / API
        </p>

        <h1 className="mt-2 max-w-2xl text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">
          หนังน่าดู รวมไว้ที่เดียว
        </h1>

        <p className="mt-4 max-w-xl text-slate-600">
          ตอนนี้ MovieHub ยังมีหนังจากไฟล์ data.js
          เราจะเชื่อมต่อ TMDB เพื่อดึงข้อมูลหนังเพิ่มเติม
          และเตรียมต่อกับ Backend ของทีม
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/movies"
            className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
          >
            ดูหนังทั้งหมด
          </Link>

          <Link
            to="/lab"
            className="rounded-lg border border-emerald-200 bg-white px-4 py-2 text-sm text-emerald-700 hover:bg-emerald-50"
          >
            ทดลองยิง API
          </Link>
        </div>
      </section>

      {/* Featured Movies */}
      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              หนังแนะนำ
            </h2>

            <p className="text-sm text-slate-500">
              สุ่มลำดับใหม่ได้ แหล่งข้อมูล: data.js
            </p>
          </div>

          <button
            type="button"
            onClick={handleShuffle}
            disabled={picks.length < 2}
            className="shrink-0 text-sm text-emerald-600 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
          >
            สุ่มใหม่
          </button>
        </div>

        <FeaturedCarousel movies={picks} />
      </section>

      {/* Project Roadmap */}
      <section className="mt-16 pb-10">
        <h2 className="text-xl font-semibold text-slate-900">
          แผนที่ของโปรเจกต์นี้
        </h2>

        <p className="text-sm text-slate-500">
          หน้าตาเสร็จแล้ว เหลือเติมส่วนที่คุยกับ API ทีละขั้น
        </p>

        <ol className="mt-4 divide-y divide-emerald-100 rounded-xl border border-emerald-100 bg-white">
          {STEPS.map(step => (
            <li
              key={step.n}
              className="flex items-center gap-4 px-4 py-3"
            >
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-emerald-50 text-sm font-medium text-emerald-700">
                {step.n}
              </span>

              <div className="min-w-0">
                <p className="text-sm text-slate-900">
                  {step.what}
                </p>

                <code className="text-xs text-slate-400">
                  {step.file}
                </code>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

export default Home;
