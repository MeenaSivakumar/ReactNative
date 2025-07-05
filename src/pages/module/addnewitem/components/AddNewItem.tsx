import React, {useState} from 'react';
import {TextInput, View} from 'react-native';

type NewItem = {
  ItemName: string;
  Quantity: number;
  Unit: string;
};
const AddNewItem = ({}) => {
  const [formData, setFormData] = useState<NewItem>({
    ItemName: '',
    Quantity: 0,
    Unit: '',
  });
  const [itemList, setItemList] = useState<NewItem[]>([]);

  const handleChange = (field: keyof NewItem,value:string) => {
    setFormData((prev)=>({...prev, [field]: field === 'Quantity' ? parseInt(value) || 0 : value,}));
  };
  // const handleClick = ({})=>{

  // }
  return (
    <View>
      <TextInput
        value={formData.ItemName}
        onChange={(text) => handleChange('ItemName',text)}
        placeholder="Item Name"
      />
      <TextInput
        value={formData.Quantity}
        onChange={(input) => handleChange('Quantity',input)}
        placeholder="Quantity"
      />
      <TextInput
        value={formData.Unit}
        onChange={(input) => handleChange('Unit',input)}
        placeholder="Unit"
      />
    </View>
  );
};

export default AddNewItem;
