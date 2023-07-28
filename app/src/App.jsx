import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchResult from "./components/SearchResult/SearchResult";

export const BASE_URL = "http://localhost:9000";

const App = () => {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [selectedBtn, setSelectedBtn] = useState("all");

  useEffect(() => {
    const fetchFoodData = async () => {
      setLoading(true);

      try {
        const response = await fetch(BASE_URL);

        const json = await response.json();

        setData(json);
        setFilteredData(json);
        setLoading(false);
      } catch (err) {
        setErr("Unable to Fetch Data");
      }
    };
    fetchFoodData();
  }, []);

  const searchFood = (e) => {
    const searchValue = e.target.value;

    if (searchValue == "") {
      setFilteredData(null);
    }

    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filter);
  };

  const filteredFood = (type) => {
    if (type == "all") {
      setFilteredData(data);
      setSelectedBtn("all");
      return;
    }

    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilteredData(filter);
    setSelectedBtn(type);
  };

  const filterBtns = [
    {
      name: "All",
      type: "all",
    },
    {
      name: "Breakfast",
      type: "breakfast",
    },
    {
      name: "Lunch",
      type: "lunch",
    },
    {
      name: "Dinner",
      type: "dinner",
    },
  ];

  if (err) return <div>{err}</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Container>
        <TopContainer>
          <div className="logo">
            <img src="/logo2.png" alt="logo" />
          </div>

          <div className="search">
            <input onChange={searchFood} type="text" placeholder="Search" />
          </div>
        </TopContainer>

        <FilterContainer>
          {filterBtns.map((value) => (
            <Button
              isSelected={selectedBtn == value.type}
              key={value.name}
              onClick={() => filteredFood(value.type)}
            >
              {value.name}
            </Button>
          ))}
        </FilterContainer>
      </Container>
      <SearchResult data={filteredData} />
    </>
  );
};

export default App;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  /* 95f91b */
`;

const TopContainer = styled.section`
  background-color: #fcd24b;
  min-height: 140px;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  align-items: center;

  .search {
    input {
      background-color: transparent;
      border: none;
      color: #000000;
      /* border-radius: 0 40% 55% 0 ; */
      height: 48px;
      font-size: 16px;
      padding: 0 10px;
      &::placeholder {
        color: #000000;
      }
    }
  }
  @media (0 < width < 600px) {
    flex-direction: column;
    /* height: 60px; */
  }
`;

const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding: 20px;
`;

export const Button = styled.button`
  background-color: ${(isSelected) => (isSelected ? "#ff4343" : "#fe9595")};
  outline: ipx solid ${(isSelected) => (isSelected ? "white" : "#fe9595")};
  border-radius: 10px;
  padding: 6px 12px;
  border: none;
  color: white;
  cursor: pointer;
  box-shadow: 2px 5px black;
  &:hover {
    background-color: #fe9595;
  }
`;
