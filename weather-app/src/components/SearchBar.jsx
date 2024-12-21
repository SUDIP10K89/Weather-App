import React,{useState} from 'react'

const SearchBar = ({onSearch}) => {
    const [city, setCity] = useState('');

    const handleSearch = () => {
        if(city.trim()){
            onSearch(city);
            setCity('');
        }
    }
    

  return (
    <div className="flex flex-col items-center">
      <input
        type="text"
        value={city}
        placeholder="Enter the city (Eg : Kathmandu)"
        onChange={(e) => setCity(e.target.value)}
        className="p-2 border border-gray-300 rounded mb-4 w-64"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Search
      </button>
    </div>
  )
}

export default SearchBar
