//Node Imports
import React from 'react'
import { View, Text } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown';
//Local Imports
import { globalPath } from '../constants/globalPath';
import { colors } from '../constants/colorsPallet';
import { hp } from '../helpers/Responsiveness';
import { wp } from '../helpers/Responsiveness';
import Icon from './Icon';
import ResponsiveText from './RnText';
export default function SmallDropDown({defaultButtonText,title, ...props }) {


  return (
    <View style={{
      backgroundColor:props.backgroundColor?props.backgroundColor: null,
      height: props.height ? props.height : wp(10),
      width: props.width ? props.width : wp(87),
      alignSelf: 'center',
      justifyContent: 'center',
      borderRadius: 20,
      borderColor:props.borderColor?props.borderColor:colors.primary,
      borderRadius: 10,
      borderWidth:0.5,
      borderColor:colors.grey1
    }}>
        <ResponsiveText margin={[0,0,0,0]} color={colors.grey1} size={2.8} >{title}</ResponsiveText>
      
      <SelectDropdown
        statusBarTranslucent={false}
        dropdownStyle={{ borderRadius: 5, }}
        dropdown1RowTxtStyle={{ color: colors.green, textAlign: "left", marginStart: 10, fontSize: 5, }}
        // defaultValueByIndex={0}
        defaultButtonText={defaultButtonText?defaultButtonText:title}
        rowTextStyle={{ color:props.btncolor?props.btncolor: colors.black, fontSize: 10 }}
        rowStyle={{ backgroundColor:props.btnbackgroundColor?props.btnbackgroundColor: null, borderBottomColor: colors.black1, borderBottomWidth: 0 }}
        buttonStyle={{
          backgroundColor: props.backgroundColor ? props.backgroundColor : null,
           height: props.btnheight ? props.btnheight : hp(6),
          // width: props.btnwidth ? props.btnwidth : wp(90),
          height: props.height ? props.height : hp(15),
          width: props.width ? props.width : wp(90),
           alignSelf: 'center',
          borderRadius: 10,
          // borderWidth:1,
          paddingBottom:13
        }}
        buttonTextStyle={{ color: props.color ? props.color : colors.black, fontSize: 8,  }}
        renderDropdownIcon={() => {
          return (
            <Icon source={globalPath.arrow} tintColor={colors.gray} size={10} margin={[0, 0, 0, 0]} />
            
          );
        }}
        // dropdownIconPosition={"left"}
        data={props.data ? props.data : undefined}
        onSelect={props.onSelect ? props.onSelect : () => { }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          return item;
        }}
      />
    </View>
  )
}
