import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect } from "react";

interface MovieForm {
  id: number;
  title: string;
  poster?: string;
  category?: string;
  duration: number;
}

function AddPage() {
  const {id} = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  }= useForm<MovieForm>();

  useEffect(() => {
    if(id){
      (async () =>{
        try {
          const { data } = await axios.get(
            `http://localhost:3000/movies/${id}`
          );
          reset(data);
        } catch (error) {
          toast.error("Không tải được dữ liệu phim!");
        }
      })();
    }
  }, [id, reset]);

  const onSubmit = async (formData: MovieForm) => {
    try {
      if (id) {
        await axios.put(
          `http://localhost:3000/movies/${id}`,
          formData
        );
        toast.success("Cập nhật phim thành công")
      }else{
        await axios.post(
          "http://localhost:3000/movies",
          formData
        );
        toast.success("Thêm mới phim thành công")
      }
      navigate("/list");
    } catch (error) {
      toast.error("Đã sảy ra lỗi");
    }
  };

  return (
    <div className="p-6 text-left">
      <h1 className="text-2xl font-semibold mb-6">
        {id ? "Cập nhật phim" : "Thêm mới phim"}
      </h1>

       <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 max-w-xl mx-auto bg-white p-6 shadow rounded-lg"
      >
         <div>
          <label className="block font-medium mb-1">Tên phim</label>
          <input
            {...register("title", { required: "Không được để trống" })}
            className="w-full border rounded-lg px-3 py-2"
          />
          {errors.title && (
            <span className="text-red-500 text-sm">
              {errors.title.message}
            </span>
          )}
        </div>
        <div>
          <label className="block font-medium mb-1">Link ảnh</label>
          <input
            {...register("poster", { required: "Không được để trống" })}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
         <div>
          <label className="block font-medium mb-1">
            Thời lượng (phút)
          </label>
          <input
            type="number"
            {...register("duration", {
              required: "Không được để trống",
              min: 1,
            })}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
         <div>
          <label className="block font-medium mb-1">Thể loại</label>
          <select
            {...register("category", { required: true })}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="Hành động">Hành động</option>
            <option value="Tình cảm">Tình cảm</option>
            <option value="Kinh dị">Kinh dị</option>
            <option value="Hài">Hài</option>
            <option value="Hoạt hình">Hoạt hình</option>
          </select>
        </div>
         <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
           {id ? "Lưu thay đổi" : "Thêm phim"}
        </button>
      </form>
    </div> 
  );
}

export default AddPage;
