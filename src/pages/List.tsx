import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";


interface Movie {
  id: number;
  title: string;
  poster?: string;
  category?: string;
  duration: number;
}

function ListPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/movies");
        setMovies(data);
      } catch (error) {
        toast.error("Lỗi khi tải danh sách phim");
      }
    })();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa không")) {
      try {
        await axios.delete(`http://localhost:3000/movies/${id}`);
        toast.success("Xóa thành công");
        setMovies(movies.filter((movie) => movie.id !== id));
      } catch (error) {
        toast.error("Xóa thất bại");
      }
      }
  };

 return (
    <div className="p-6">
    <h1 className="text-2xl font-semibold mb-6 text-left">
      Danh sách phim
    </h1>

    <div className="overflow-x-auto">
      <table className="w-full border border-gray-300 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Tên phim</th>
            <th className="px-4 py-2 border">Ảnh</th>
            <th className="px-4 py-2 border">Thời lượng</th>
            <th className="px-4 py-2 border">Thể loại</th>
            <th className="px-4 py-2 border">Hành động</th> 
          </tr>
        </thead>

        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id} className="hover:bg-gray-50 text-left">
              <td className="px-4 py-2 border">{movie.id}</td>

              <td className="px-4 py-2 border">{movie.title}</td>

              <td className="px-4 py-2 border">
                <img
                  src={movie.poster}
                  className="w-16 h-20 object-cover"
                />
              </td>
              <td className="px-4 py-2 border">
                {movie.duration}
              </td>
              <td className="px-4 py-2 border">
                {movie.category}
              </td>
              <td className="px-4 py-2 border text-center space-x-2">
                <Link
                  to={`/edit/${movie.id}`}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Sửa
                  </Link>
                <button
                  onClick={() => handleDelete(movie.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>  
 )};

export default ListPage;