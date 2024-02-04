import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {useParams} from 'react-router-dom';
import SalesForm from './SalesForm';
import MasterLayout from '../MasterLayout';
import HeaderTitle from '../header/HeaderTitle';
import {editSale, fetchSale} from '../../store/action/salesAction';
import {fetchAllCustomer} from '../../store/action/customerAction';
import {fetchAllWarehouses} from '../../store/action/warehouseAction';
import {getFormattedMessage} from '../../shared/sharedMethod';
import status from '../../shared/option-lists/status.json';
import paymentStatus from '../../shared/option-lists/paymentStatus.json';
import paymentType from '../../shared/option-lists/paymentType.json';
import Spinner from "../../shared/components/loaders/Spinner";
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";

const CreateSaleSaleReturn = (props) => {
    const {fetchSale, sales, customers, fetchAllCustomer, warehouses, fetchAllWarehouses, isLoading} = props;
    const {id} = useParams();

    useEffect(() => {
        fetchAllCustomer();
        fetchAllWarehouses();
        fetchSale(id);
    }, []);

    const selectedStatus = sales.attributes && sales.attributes.status && status.filter((item) => item.value === sales.attributes.status)
    const selectedPayment = sales.attributes && sales.attributes.payment_status && paymentStatus.filter((item) => item.value === sales.attributes.payment_status)
    const selectedPaymentType = sales.attributes && sales.attributes.payment_type && paymentType.filter((item) => item.value === sales.attributes.payment_type)

    const itemsValue = sales && sales.attributes && {
        date: sales.attributes.date,
        warehouse_id: {
            value: sales.attributes.warehouse_id,
            label: sales.attributes.warehouse_name,
        },
        customer_id: {
            value: sales.attributes.customer_id,
            label: sales.attributes.customer_name,
        },
        tax_rate: sales.attributes.tax_rate,
        tax_amount: sales.attributes.tax_amount,
        discount: sales.attributes.discount,
        shipping: sales.attributes.shipping,
        grand_total: sales.attributes.grand_total,
        amount: sales.attributes.amount,
        sale_items: sales.attributes.sale_items.map((item) => ({
            code: item.product && item.product.code,
            name: item.product && item.product.name,
            product_unit: item.product.product_unit,
            product_id: item.product_id,
            short_name: item.sale_unit && item.sale_unit.short_name && item.sale_unit.short_name,
            stock_alert:  item.product && item.product.stock_alert,
            product_price: item.product_price,
            fix_net_unit: item.product_price,
            net_unit_price: item.product_price,
            tax_type: item.tax_type,
            tax_value: item.tax_value,
            tax_amount: item.tax_amount,
            discount_type: item.discount_type,
            discount_value: item.discount_value,
            discount_amount: item.discount_amount,
            isEdit: true,
            stock: item.product && item.product.stocks.filter(item => item.warehouse_id === sales.attributes.warehouse_id),
            sub_total: item.sub_total,
            sale_unit: item.sale_unit && item.sale_unit.id && item.sale_unit.id,
            quantity: item.quantity,
            id: item.id,
            sale_item_id: item.id,
            newItem: '',
        })),
        id: sales.id,
        notes: sales.attributes.note,
        payment_status: {
            label: selectedPayment && selectedPayment[0] && selectedPayment[0].label,
            value: selectedPayment && selectedPayment[0] && selectedPayment[0].value
        },
        payment_type: {
            label: selectedPaymentType && selectedPaymentType[0] && selectedPaymentType[0].label,
            value: selectedPaymentType && selectedPaymentType[0] && selectedPaymentType[0].value
        },
        status_id: {
            label: selectedStatus && selectedStatus[0] && selectedStatus[0].label,
            value: selectedStatus && selectedStatus[0] && selectedStatus[0].value
        }
    };

    return (
        <MasterLayout>
            <TopProgressBar/>
            <HeaderTitle title={getFormattedMessage('sale.edit.title')} to='/app/sales'/>
            {isLoading ? <Spinner /> :
                <SalesForm singleSale={itemsValue} id={id} customers={customers} warehouses={warehouses}/>}
        </MasterLayout>
    )
};

const mapStateToProps = (state) => {
    const {sales, customers, warehouses, isLoading} = state;
    return {sales, customers, warehouses, isLoading}
};

export default connect(mapStateToProps, {fetchSale, editSale, fetchAllCustomer, fetchAllWarehouses})(CreateSaleSaleReturn);









// import React, {useEffect} from 'react';
// import SaleReturnForm from '../saleReturn/SaleReturnForm';
// import MasterLayout from '../MasterLayout';
// import HeaderTitle from '../header/HeaderTitle';
// import {connect} from 'react-redux';
// import {fetchAllWarehouses} from '../../store/action/warehouseAction';
// import {fetchAllCustomer} from '../../store/action/customerAction';
// import {useParams} from 'react-router-dom';
// import {fetchSaleReturn} from '../../store/action/salesReturnAction';
// // import saleReturnStatus from './saleReturnStatus.json';
// import saleReturnStatus from "../saleReturn/saleReturnStatus.json"
// import {getFormattedMessage} from '../../shared/sharedMethod';
// import Spinner from "../../shared/components/loaders/Spinner";
// import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
// import {fetchSale} from "../../store/action/salesAction";
//
// const CreateSaleSaleReturn = (props) => {
//     const {fetchSale, sales, customers, fetchAllCustomer, warehouses, fetchAllWarehouses, isLoading} = props;
//     const {id} = useParams();
//
//     useEffect(() => {
//         fetchAllCustomer();
//         fetchAllWarehouses();
//         fetchSale(id);
//     }, [])
//
//     const selectedStatus = sales.attributes && sales.attributes.status && saleReturnStatus.filter((item) => item.value === sales.attributes.status)
//
//     sales && sales.attributes &&  sales?.attributes?.sale_items.forEach((item) => {
//         item.code = item.product && item.product.code
//         item.name = item.product && item.product.name
//         item.stock_alert = item.product && item.product.stock_alert
//         item.short_name = item.sale_unit.short_name
//         item.fix_net_unit = item.product_price
//         item.newItem = ''
//         item.sale_return_item_id = item.id
//         item.sale_unit = item.product && item.product.sale_unit ? Number(item.product.sale_unit) : item.sale_unit
//     });
//
//     const itemsValue = sales && sales.attributes && {
//         date: sales.attributes.date,
//         warehouse_id: {
//             value:  sales.attributes.warehouse_id,
//             label: sales.attributes.warehouse_name,
//         },
//         customer_id: {
//             value:  sales.attributes.customer_id,
//             label: sales.attributes.customer_name,
//         },
//         tax_rate: sales.attributes.tax_rate,
//         tax_amount: sales.attributes.tax_amount,
//         discount: sales.attributes.discount,
//         shipping: sales.attributes.shipping,
//         grand_total : sales.attributes.grand_total,
//         amount: sales.attributes.amount,
//         sale_items: sales && sales.attributes && sales.attributes.sale_return_items,
//         id: sales.id,
//         status_id: {
//             label: selectedStatus[0] && selectedStatus[0].label,
//             value: selectedStatus[0] && selectedStatus[0].value
//         },
//         note:sales.attributes.note,
//     };
//
//     return (
//         <MasterLayout>
//             <TopProgressBar/>
//             <HeaderTitle title={getFormattedMessage('sale-return.edit.title')} to='/app/sale-return'/>
//             {isLoading ? <Spinner /> :
//                 sales && <SaleReturnForm singleSale={itemsValue} id={id} customers={customers} warehouses={warehouses}/>}
//         </MasterLayout>
//     )
// }
//
// const mapStateToProps = (state) => {
//     const {sales, customers, warehouses, isLoading} = state;
//     return {sales, customers, warehouses, isLoading}
// };
//
// export default connect(mapStateToProps, {fetchSale, fetchAllCustomer, fetchAllWarehouses})(CreateSaleSaleReturn);
