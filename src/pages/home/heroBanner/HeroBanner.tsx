import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.scss";

import useFetch from "src/hooks/useFetch";

import Img from "src/components/lazyLoadImage/Img";
import ContentWrapper from "src/components/contentWrapper/ContentWrapper";
import { fetchDataFromApi } from "src/utils/api";
import { getRandomNumber } from "src/utils/functions";

const HeroBanner = () => {
    const [background, setBackground] = useState("");
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const { url } = useSelector((state) => state.home);
    const { data, loading } = useFetch("/movie/upcoming");

    useEffect(() => {
        const bg =
            url.backdrop +
            data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
        setBackground(bg);
    }, [data]);

    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`);
        }
    };

    const handleFindMoive = async () => {
        let result: any = new Error('init')
        const last = await fetchDataFromApi(`/movie/latest`)
        while(result instanceof Error){
            const number = getRandomNumber(1000,Number(last?.id || 1252191))
            result = await fetchDataFromApi(`/movie/${number}`)
        }
        navigate(`/movie/${result?.id || 379088}`);
    }

    return (
        <div className="heroBanner">
            {!loading && (
                <div className="backdrop-img">
                    <Img src={background} />
                </div>
            )}

            <div className="opacity-layer"></div>
            <ContentWrapper>
                <div className="heroBannerContent">
                    <span className="title">What to watch today?</span>
                    <span className="subTitle">
                        A great movie is waiting for you.
                        Explore now.
                    </span>
                    <div className="searchInput">
                        <input
                            type="text"
                            placeholder="Search for a movie or tv show...."
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyUp={searchQueryHandler}
                        />
                        <button>Search</button>
                    </div>
                    <div className="more">
                        <button onClick={handleFindMoive}>You might like || loading</button>
                        <button>Great movie Nghĩa recommend</button>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    );
};

export default HeroBanner;
