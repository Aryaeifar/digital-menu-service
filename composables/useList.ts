
export default function () {
    const foods = useState<Array<any>>('foods', () => ([]))
    
    const getFoods = () : Array<any> => {
      return foods.value
    }
  
    const setFoods= (params: Array<any>) => {
        foods.value = params
    }
  
    const clearFoods = () => {
        foods.value = []
    }
  
    return {
        getFoods,
        setFoods,
        clearFoods
    }
  }
  