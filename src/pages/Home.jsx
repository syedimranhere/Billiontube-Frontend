import VideoCard from "../components/cards&buttons/videoCard";
import { videosAPI } from "../services/videosservice";
import { useEffect, useState } from "react";
import SmoothSkeletonLoader from "../components/loaders/videoskeleton";

const Home = () => {
    const [Videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchvideos = async () => {
            try {

                const response = await videosAPI.getVideosForHome();

                setVideos(response.data)
            } catch (error) {
                setVideos(null)
            }
            finally {
                setLoading(false);

            }
        }
        fetchvideos();
    }, [])
    if (loading) {
        return (
            <SmoothSkeletonLoader />
        );
    }

    return (

        <div className="p-6">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-6">
                {Videos.map((vid) => (
                    <VideoCard key={vid._id}
                        videoId={vid._id}
                        views={vid.views}
                        title={vid.title}
                        thumbnail={vid.thumbnail} timeAgo={vid.timeAgo}
                        timestamps={vid.uploadDate}
                        owner={vid.owner._id}
                        duration={vid.duration} channelName={vid.owner.fullname} channelAvatar={vid.owner.avatar} description={vid.description} />
                ))}
            </div>
        </div>
    );
};

export default Home;
