
import { Link } from 'react-router-dom';

// การ์ดหนัง 1 ใบ
function MovieCard({ movie }) {
  // ป้องกันกรณีข้อมูลหนังไม่ถูกส่งมาหรือเป็น null
  if (!movie || typeof movie !== 'object') {
    return null;
  }

  const {
    id,
    title,
    titleTh,
    year,
    genre,
    rating,
    poster,
  } = movie;

  return (
    <Link
      to={`/movies/${id ?? ''}`}
      className="group block overflow-hidden rounded-xl border border-emerald-100 bg-white transition hover:border-emerald-300 hover:shadow-md"
    >
      {poster ? (
        <img
          src={poster}
          alt={`โปสเตอร์ ${title || 'หนัง'}`}
          loading="lazy"
          className="aspect-[2/3] w-full object-cover"
        />
      ) : (
        <div className="grid aspect-[2/3] w-full place-items-center bg-slate-100 text-4xl">
          🎬
        </div>
      )}

      <div className="p-3">
        <h3
          className="truncate font-medium text-slate-900"
          title={title || 'ไม่ระบุชื่อ'}
        >
          {title || 'ไม่ระบุชื่อ'}
        </h3>

        {titleTh && (
          <p className="truncate text-sm text-slate-500">
            {titleTh}
          </p>
        )}

        <p className="mt-1 text-xs text-slate-400">
          {year ?? 'ไม่ระบุปี'}
          {rating != null && ` | ⭐ ${rating}`}
        </p>

        {genre && (
          <p className="mt-1 truncate text-xs text-slate-400">
            {Array.isArray(genre) ? genre.join(', ') : genre}
          </p>
        )}
      </div>
    </Link>
  );
}

export default MovieCard;
