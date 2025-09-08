import { useState, useEffect, useCallback } from "react"
import { UseUserContext } from "../context/AuthContext"
import { SearchX } from "lucide-react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import { VideoCard4 } from "../components/cards&buttons/searchResultCard";
import { Blueloader } from "../components/loaders/blueloader"
export const SearchPage = () => {
    const { Authenticated } = UseUserContext();
    const [loading, setLoading] = useState(true)
    const { query } = useParams();
    const [videos, setvideos] = useState([])

    useEffect(() => {
        setLoading(true)

        const fetchinfo = async () => {
            try {

                const response = await axios.get(`/videos/search?q=${query}`)

                setvideos(response.data.results)
                setLoading(false);
            } catch (error) {
                console.error(error)

            }
            finally {
                setLoading(false)
            }
        }
        fetchinfo();
    }, [query])

    if (loading) {
        return (
            <Blueloader />
        )
    }
    return (
        <div className="flex flex-col w-full  px-2 sm:px-4 lg:px-6 gap-y-2 mt-4 mb-8 min-h-screen">
            {videos.length === 0 ? (
                <div className="flex flex-col items-center justify-center flex-1 text-center min-h-[60vh]">
                    <SearchX className="w-14 h-14 text-gray-500 mb-4" />
                    <h2 className="text-xl font-semibold text-gray-200">
                        No results found
                    </h2>
                    <p className="text-gray-400 mt-1">
                        We couldn't find anything for{" "}
                        <span className="text-red-400">"{query}"</span>
                    </p>
                </div>
            ) : (
                <div className="flex flex-col gap-2 sm:gap-3">
                    {videos.map((vid) => (
                        <div key={vid._id} className="w-full max-w-none">
                            <VideoCard4
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
                        </div>
                    ))}
                </div>
            )}
        </div>
    );


}
