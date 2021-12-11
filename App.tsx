import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

const resources = [
  "Copper Ore",
  "Iron Ore",
  "Wood Log",
  "Stone",
  "Coal",
  "Wolframite",
];

const allItems = [
  {
    name: "Wood Plank",
    itemsPerMin: 15,
    building: "Workshop",
    value: 1,
    ingredientList: [{ name: "Wood Log", amount: 1 }],
  },
  {
    name: "Wood Frame",
    itemsPerMin: 7.5,
    building: "Workshop",
    value: 4,
    ingredientList: [{ name: "Wood Plank", amount: 4 }],
  },
  {
    name: "Copper Wire",
    itemsPerMin: 30,
    building: "Workshop",
    value: 2,
    ingredientList: [{ name: "Copper Ingot", amount: 3 }],
  },
  {
    name: "Heat Sink",
    itemsPerMin: 10,
    building: "Workshop",
    value: 5,
    ingredientList: [{ name: "Copper Ingot", amount: 5 }],
  },
  {
    name: "Iron Gear",
    itemsPerMin: 15,
    building: "Workshop",
    value: 2,
    ingredientList: [{ name: "Iron Ingot", amount: 2 }],
  },
  {
    name: "Iron Plating",
    itemsPerMin: 20,
    building: "Workshop",
    value: 2,
    ingredientList: [{ name: "Iron Ingot", amount: 4 }],
  },
  {
    name: "Iron Ingot",
    itemsPerMin: 30,
    building: "Furnace",
    value: 1,
    ingredientList: [{ name: "Iron Ore", amount: 1 }],
  },
  {
    name: "Copper Ingot",
    itemsPerMin: 30,
    building: "Furnace",
    value: 1,
    ingredientList: [{ name: "Copper Ore", amount: 1 }],
  },
];


export default function App() {
  interface Ingredient {
    name: string,
  }

  const [currentItem, setCurrentItem] = useState("Wood Plank");
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(()=>{
    setIngredients([])
  },[currentItem])


  useEffect(()=>{
    if(ingredients.length > 0){
      return
    }
    GenerateList(currentItem)
  }, [ingredients])

  function GenerateList(name: string, depth = 1) {
    const itemInfo = allItems.find((item) => {
      return item.name == name;
    });

    itemInfo?.ingredientList.forEach((ingredient) => {
      if (resources.includes(ingredient.name)) {

        setIngredients([...ingredients, {name: name}])

      } else {
        const ingInfo = allItems.find((item) => {
          return item.name == ingredient.name;
        });
        setIngredients([...ingredients, {name: name}])

        GenerateList(ingredient.name, depth + 1)
      }
    });
  }

  return (
    <View style={{ alignItems: "center" }}>
            <Picker
        selectedValue={currentItem}
        onValueChange={(itemValue, itemIndex) => setCurrentItem(itemValue)}
        itemStyle={{ borderColor: "red", borderWidth: 2, borderRadius: 5 }}
      >
        {allItems.map((data) => {
          return <Picker.Item label={data.name} value={data.name} />;
        })}
      </Picker>
      {ingredients.map((data) => {
          return <Text>{data.name}</Text>;
        })}
    </View>
  );
}
