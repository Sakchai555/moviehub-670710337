
import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';

const PER_PAGE = 4;

function FeaturedCarousel({ movies: movieData }) {
  // ตรวจสอบว่าข้อมูลที่ได้รับเป็น Array จริงหรือไม่
  const movies = Array.isArray(movieData) ? movieData : [];

  const [page, setPage] = useState(0);

  // จำนวนชุดทั้งหมด
  const total = Math.ceil(movies.length / PER_PAGE);

  // ปรับหน้าปัจจุบันเมื่อจำนวนหนังเปลี่ยน
  useEffect(() => {
    if (total === 0) {
      setPage(0);
    } else if (page >= total) {
      setPage(total - 1);
    }
  }, [page, total]);

  // ยังไม่มีข้อมูลหนัง
  if (movies.length === 0) {
    return (
      <p className="py-10 text-center text-slate-400">
        ยังไม่มีหนังแนะนำ
      </p>
    );
  }

  // หนังที่แสดงในชุดปัจจุบัน
  const safePage = Math.min(page, total - 1);
  const shown = movies.slice(
    safePage * PER_PAGE,
    safePage * PER_PAGE + PER_PAGE
  );

  // เปลี่ยนชุดแบบวนรอบ
  const prev = () => {
    setPage(p => (p - 1 + total) % total);
  };

  const next = () => {
    setPage(p => (p + 1) % total);
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {shown.map((movie, index) => (
          <MovieCard
            key={movie?.id ?? `${safePage}-${index}`}
            movie={movie}
          />
        ))}
      </div>

      {total > 1 && (
        <div className="mt-4 flex items-center justify-center gap-4 text-sm text-slate-500">
          <button
            type="button"
            onClick={prev}
            className="rounded-lg border border-emerald-200 bg-white px-3 py-1.5 text-emerald-700 hover:bg-emerald-50"
          >
            ก่อนหน้า
          </button>

          <span>
            ชุดที่ {safePage + 1} จาก {total}
          </span>

          <button
            type="button"
            onClick={next}
            className="rounded-lg border border-emerald-200 bg-white px-3 py-1.5 text-emerald-700 hover:bg-emerald-50"
          >
            ถัดไป
          </button>
        </div>
      )}
    </div>
  );
}

export default FeaturedCarousel;
