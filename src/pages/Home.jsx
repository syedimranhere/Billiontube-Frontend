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

        <div className="min-h-screen bg-black text-white pt-14 sm:pt-16">

            <div className="px-2 sm:px-3 md:px-4 py-3 sm:py-4">
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-5 gap-3 sm:gap-4">
                    {Videos.map((vid) => (
                        <VideoCard key={vid._id}
                            videoId={vid._id}
                            views={vid.views}
                            title={vid.title}
                            thumbnail={vid.thumbnail}
                            timeAgo={vid.timeAgo}
                            timestamps={vid.uploadDate}
                            owner={vid.owner._id}
                            duration={vid.duration}
                            channelName={vid.owner.fullname}
                            channelAvatar={vid.owner.avatar}
                            description={vid.description}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
