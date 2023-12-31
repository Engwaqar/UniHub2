import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { routeName } from "../constants/routeName";
import BookService from "../screens/BookService/BookService";
import Services from "../screens/BookService/BookCleaner1";
import EventListed from "../screens/EventScreen/EventListed";
import EventService from "../screens/EventScreen/EventService";
import Home from "../screens/Home/Home";
import EditHubService from "../screens/Hub/EditHubService";
import HubServiceList from "../screens/Hub/HubServiceList";
import SellHubService from "../screens/Hub/SellHubService";
import SellProduct from "../screens/MarketPlace/SellProduct";
import YourProducts from "../screens/MarketPlace/YourProducts";
import BookCleaner1 from "../screens/BookService/BookCleaner1";
import BookCleaner2 from "../screens/BookService/BookCleaner2";
import BookCleaner3 from "../screens/BookService/BookCeaner3";
import Checkout from "../screens/BookService/Checkout";
import PaymentConfirmation from "../screens/BookService/PaymentConfirmation";
import OrderPlaced from "../screens/BookService/OrderPlaced";
import BookStorage from "../screens/BookService/BookStorage";
import BookMoveOut from "../screens/BookService/BookMoveOut";
import EditProduct from "../screens/MarketPlace/EditProduct";
import EditEvent from "../screens/EventScreen/EditEvent";
import AllServices from "../screens/BookService/AllServices";
import ServiceProvider from "../screens/BookService/ServiceProvider";
import CartList from "../screens/Home/CartList";
import BuyerCheckout from "../screens/BuyerMarket/BuyerCheckout";
import BuyerPayment from "../screens/BuyerMarket/BuyerPayment";
import BuyerOrderPlaced from "../screens/BuyerMarket/BuyerOrderPlaced";
import MallScreen from "../screens/Mall/MallScreen";
import BacktoSchool from "../screens/BacktoSchool/BacktoSchool";
import MallProducts from "../screens/Mall/MallProducts";
import CheckOut1 from "../screens/CheckOut/CheckOut1";
import CheckOut2 from "../screens/CheckOut/CheckOut2";
import CheckOut3 from "../screens/CheckOut/CheckOut3";
import BToSProduct from "../screens/BacktoSchool/BToSProduct";
import MarketProduct from "../screens/BuyerMarket/MarketProduct";
import ProductDetail from "../screens/BuyerMarket/ProductDetail";
import OrderDetail from "../screens/BuyerMarket/OrderDetail";
import EventsList from "../screens/TicketBooking/EventsList";
import Ticket1 from "../screens/TicketBooking/Ticket1";
import Ticket2 from "../screens/TicketBooking/Ticket2";
import Ticket3 from "../screens/TicketBooking/Ticket3";
import Ticket4 from "../screens/TicketBooking/Ticket4";
import Ticket5 from "../screens/TicketBooking/Ticket5";
import Ticket6 from "../screens/TicketBooking/Ticket6";
import QRCodeScreen from "../screens/TicketBooking/QRCode";
import HubServices from "../screens/BookService/HubServices";
import HubServicesDetail from "../screens/BookService/HubServiceDetail";
import HubServiceProDetl from "../screens/BookService/HubServiceProDetl";
import BookAppointment from "../screens/BookService/BookAppointment";
import IncomingTicket from "../screens/Home/IncomingTicket";
import IncomingTicketDetail from "../screens/Home/IncomingTicketDetail";
import ConfirmPayment from "../screens/Home/ConfirmPayment";
import AllEvents from "../screens/BrowsEvents/AllEvents";
import EventStack from "./EventStack";
import Profile from "../screens/Account/Profile";
import OrderSummery from "../screens/Account/OrderSummery";
import AddCard from "../screens/Account/AddCard";
import Promotion from "../screens/Promote/Promotion";
import BarcodeReader from "../screens/Scanner/BarcodeReader";
import Dashboard from "../screens/DashBoard/Dashboard";
import Messages from "../screens/Chat/Messages";
import ChatInbox from "../screens/Chat/ChatInbox";

const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={routeName.HOME}
    >
      <Stack.Screen name={routeName.HOME} component={Home} />
      <Stack.Screen name={routeName.PROFILE} component={Profile} />
      <Stack.Screen
        name={routeName.SELL_HUB_SERVICE}
        component={SellHubService}
      />
      <Stack.Screen
        name={routeName.HUB_SERVICE_LIST}
        component={HubServiceList}
      />
      <Stack.Screen
        name={routeName.EDIT_HUB_SERVICE}
        component={EditHubService}
      />
      <Stack.Screen
        name={routeName.ServiceProvider}
        component={ServiceProvider}
      />
      {/* Events */}
      <Stack.Screen name={routeName.EVENT_LISTED} component={EventListed} />
      <Stack.Screen name={routeName.EVENT_SERVICE} component={EventService} />
      <Stack.Screen name={routeName.EDIT_EVENT} component={EditEvent} />
      {/* Market Place */}
      <Stack.Screen name={routeName.YOUR_PRODUCTS} component={YourProducts} />
      <Stack.Screen name={routeName.SELL_PRODUCTS} component={SellProduct} />
      <Stack.Screen name={routeName.EDIT_PRODUCTS} component={EditProduct} />
      <Stack.Screen name={routeName.ALL_SERVICES} component={AllServices} />
      <Stack.Screen name={routeName.BOOK_SERVICE} component={BookService} />
      <Stack.Screen name={routeName.BOOK_CLEANER1} component={BookCleaner1} />
      <Stack.Screen name={routeName.BOOK_CLEANER2} component={BookCleaner2} />
      <Stack.Screen name={routeName.BOOK_CLEANER3} component={BookCleaner3} />
      <Stack.Screen name={routeName.CHECKOUT} component={Checkout} />
      <Stack.Screen
        name={routeName.PAYMENT_CONFIRMATION}
        component={PaymentConfirmation}
      />
      <Stack.Screen name={routeName.ORDER_PLACED} component={OrderPlaced} />
      <Stack.Screen name={routeName.BOOK_STROAGE} component={BookStorage} />
      <Stack.Screen name={routeName.BOOK_MOVE_OUT} component={BookMoveOut} />
      <Stack.Screen name={routeName.HUB_SERVICE} component={HubServices} />
      <Stack.Screen
        name={routeName.HUB_SERVICE_DETAIL}
        component={HubServicesDetail}
      />
      <Stack.Screen
        name={routeName.HUB_SERVICE_PRO_DETAIL}
        component={HubServiceProDetl}
      />
      <Stack.Screen
        name={routeName.BOOK_APPOINTMENT}
        component={BookAppointment}
      />
      <Stack.Screen name={routeName.CART_LIST} component={CartList} />
      <Stack.Screen name={routeName.BUYER_CHECKOUT} component={BuyerCheckout} />
      <Stack.Screen name={routeName.BUYER_PAYMENT} component={BuyerPayment} />
      <Stack.Screen
        name={routeName.BUYER_ORDER_PLACED}
        component={BuyerOrderPlaced}
      />
      <Stack.Screen name={routeName.MALL_SCREEN} component={MallScreen} />
      <Stack.Screen name={routeName.MALL_PRODUCTS} component={MallProducts} />
      <Stack.Screen name={routeName.BACK_TO_SCHOOL} component={BacktoSchool} />
      <Stack.Screen
        name={routeName.INCOMING_TICKET}
        component={IncomingTicket}
      />
      <Stack.Screen
        name={routeName.INCOMING_TICKET_DETAIL}
        component={IncomingTicketDetail}
      />
      <Stack.Screen
        name={routeName.CONFIRM_PAYMENT}
        component={ConfirmPayment}
      />
      <Stack.Screen name={routeName.ADD_CARD} component={AddCard} />
      <Stack.Screen name={routeName.PROMOTION} component={Promotion} />
      {/* {OrderSummery} */}
      <Stack.Screen name={routeName.ORDER_SUMMARY} component={OrderSummery} />
      {/* MarketPlace */}
      <Stack.Screen name={routeName.MARKET_PRODUCT} component={MarketProduct} />
      <Stack.Screen
        name={routeName.PRODUCT_DETAILS}
        component={ProductDetail}
      />
      <Stack.Screen name={routeName.ORDER_DETAILS} component={OrderDetail} />

      {/* <Stack.Screen name={routeName.BROWSE_EVENT} component={EventsList} /> */}
      <Stack.Screen name={routeName.BROWSE_EVENT} component={AllEvents} />

      <Stack.Screen name={"Ticket1"} component={Ticket1} />
      <Stack.Screen name={"Ticket2"} component={Ticket2} />
      <Stack.Screen name={"Ticket3"} component={Ticket3} />
      <Stack.Screen name={"Ticket4"} component={Ticket4} />
      <Stack.Screen name={"Ticket5"} component={Ticket5} />
      <Stack.Screen name={"Ticket6"} component={Ticket6} />
      <Stack.Screen name={"QRCode"} component={QRCodeScreen} />

      {/* CheckOut */}

      <Stack.Screen name={routeName.CHECK_OUT_1} component={CheckOut1} />
      <Stack.Screen name={routeName.CHECK_OUT_2} component={CheckOut2} />
      <Stack.Screen name={routeName.CHECK_OUT_3} component={CheckOut3} />
      <Stack.Screen name={routeName.B_TO_S_PRODUCTS} component={BToSProduct} />
      {/* {Scanner} */}
      <Stack.Screen name={routeName.BARCODE_READER} component={BarcodeReader} />
       {/* {Dashboard} */}
      <Stack.Screen name={routeName.EVENTS_DASHBOARD} component={Dashboard} />
       {/* {ChatBox} */}
      <Stack.Screen name={routeName.MESSANGER} component={Messages} />
      <Stack.Screen name={routeName.CHATBOX} component={ChatInbox} />

    </Stack.Navigator>
  );
}

export default HomeStack;
