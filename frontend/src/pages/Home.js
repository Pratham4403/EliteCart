import React from "react";
import CategoryList from "../components/CategoryList";
import BannerProduct from "../components/BannerProduct";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";

const Home = ()=>{
    return(
        <div>
            <CategoryList/>
            <BannerProduct/>
            <HorizontalCardProduct category={"airdopes"} heading={"Trending Airdopes of the Season 🔥"}/>
            <HorizontalCardProduct category={"watches"} heading={"Trending Timepieces of the Season ⏳"}/>
            <VerticalCardProduct category={"mobiles"} heading={"Handpicked Mobiles for Every Budget ⚡"}/>
            <VerticalCardProduct category={"mouse"} heading={"Trending Picks Wired and Wireless Mice ✨"}/>
            <VerticalCardProduct category={"televisions"} heading={"Latest Smart TVs at Amazing Prices 🌟"}/>
            <VerticalCardProduct category={"camera"} heading={"Capture Every Moment in Style 📷"}/>
            <VerticalCardProduct category={"earphones"} heading={"Perfect Earphones for Every Mood 🎧"}/>
            <VerticalCardProduct category={"refrigerator"} heading={"Keep It Cool Keep It Fresh ❄️"}/>
            <VerticalCardProduct category={"speakers"} heading={"Feel the Power of Sound 🔊"}/>
            <VerticalCardProduct category={"trimmers"} heading={"Perfect Grooming Made Easy 📈"}/>
        </div>
    )
}

export default Home;