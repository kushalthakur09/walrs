import React, { useState, useEffect } from "react";
import Navigation from "../components/navigation";
import Footer from "../components/Footer";
// import Carousel from "../components/Carousel";
import Card from "../components/Card";
import Video from "../components/Video";
export default function Home() {
  const [foodItem, setFoodItem] = useState([]);
  const [foodCat, setFoodCat] = useState([]);
  const [search, setSearch] = useState('');

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    //  console.log(response[0],response[1]);
    setFoodItem(response[0]);
    setFoodCat(response[1]);
  };

  // on first { empty array means first render[]  }   render it will be executed
  useEffect(() => {
    loadData();
  }, []);
  return (
    <div>
       
      <div>
        <Navigation />
      </div>
      <div className="container cover-page ">
       <div className="carousel-caption search-bar">
         <form className="d-flex justify-content-center">
    <input
    className="form-control me-2 "
    type="search"
    placeholder="Search"
    aria-label="Search"
    value={search}
    onChange={(e)=>{
      setSearch(e.target.value)
    }}
    />
     </form>
    </div>
   </div>
     
      <div className="container m-3 background-used">
        {
          foodCat !== []
          ? foodCat.map((data) => {
              return (
                <div className="row m-3">
                  <div key={data._id} className="fs-3 m-3 text-white hover-underline-animation" >
                    {data.CategoryName}
                  </div>
                  <div>
                    <div className="background-video">
                    <Video></Video>
                    </div>
                   </div>
                  <hr className="bg-success"/>
                  {foodItem !== []?
                    foodItem
                      .filter((item) => (item.CategoryName === data.CategoryName)&& (item.name.toLowerCase().includes(search.toLowerCase())))
                      .map(filterItem => {
                        return (
                          <div key={filterItem._id} className="col-12 col-md-6 col-lg-3">
                            <Card 
                              foodItem={filterItem}
                              options={filterItem.options[0]}
                            />
                          </div>
                        );
                      }):  <div>no such data found</div>
                  }
                </div>
              )
            })
          : ""}
      </div>
    <div>
        <Footer />
      </div>
    </div>
  );
}
