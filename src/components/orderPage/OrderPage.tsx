import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '../../store/store';
import {
    isMessageSendSuccessSelector,
    ordersInCartSelector,
    sendOrderInfoToTelegramTC,
    totalPriceSelector,
} from '../../store/reducers/cart-reducer';
import { useNavigate } from 'react-router-dom';
import { shippingCost } from '../../const';
import { ShippingBlock } from './shippingBlock/ShippingBlock';
import classes from './OrderPage.module.scss';
import { PaymentBlock } from './paymentBlock/PaymentBlock';
import {
    currentUserSelector,
    // isSignInSelector,
} from '../../store/reducers/auth-reducer';
import { MessageSendModal } from '../common/modal/MessageSendModal';

type OrderPageType = {
    isMakeOrder: boolean;
};

export const OrderPage: React.FC<OrderPageType> = React.memo(({ isMakeOrder }) => {
    const totalPrice = useAppSelector(totalPriceSelector);
    const currentUser = useAppSelector(currentUserSelector);
    const ordersInCart = useAppSelector(ordersInCartSelector);
    const isMessageSend = useAppSelector(isMessageSendSuccessSelector);
    // const isSignIn = useAppSelector(isSignInSelector);

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const formik = useFormik({
        initialValues: {
            city: '',
            shipping: 'deliveryToClient',
            pickupPoint: 'Partizanskaya st, 178',
            payment: 'Payment upon receipt',
            street: '',
            home: '',
            floor: '',
            flat: '',
            deliveryTime: '',
            phone: '',
            textMessage: '',
        },

        validate: values => {
            const errors: FormikErrorType = {};

            if (!values.city) {
                errors.city = 'Required';
            }

            if (formik.values.shipping === 'deliveryToClient' && !values.street) {
                errors.street = 'Required';
            }

            if (formik.values.shipping === 'deliveryToClient' && !values.home) {
                errors.home = 'Required';
            }

            if (!values.deliveryTime) {
                errors.deliveryTime = 'Required';
            }

            if (!values.phone) {
                errors.phone = 'Required';
            }

            return errors;
        },

        onSubmit: values => {
            console.log(JSON.stringify(values, null, 2));

            let orderInfo = `<b>Order info from RS Cars store</b>\n`;
            orderInfo += `<b>Sender: </b> ${currentUser.displayName} \n`;
            orderInfo += `<b>City: </b> ${values.city} \n`;
            orderInfo += `<b>Shipping: </b> ${values.shipping ? values.shipping : values.pickupPoint} \n`;
            orderInfo += `<b>Address: </b> ${values.street}, ${values.home} ${values.floor} ${values.flat} \n`;
            orderInfo += `<b>Delivery time: </b> ${values.deliveryTime} \n`;
            orderInfo += `<b>Phone: </b> ${values.phone} \n`;
            orderInfo += `<b>Goods: </b> ${ordersInCart.map(el => el.data.articleNumber)} \n`;
            orderInfo += `<b>Total price: </b> ${
                +totalPrice + (formik.values.shipping === 'deliveryToClient' ? shippingCost : 0)
            } \n`;
            orderInfo += `<b>Payment: </b> ${formik.values.payment} \n`;
            orderInfo += `<b>Comment: </b> ${values.textMessage} \n`;

            dispatch(sendOrderInfoToTelegramTC(orderInfo));

            //Возможно стоит предусмотреть кейс на случай если user не залогинился!!!
            navigate('/');

            formik.resetForm();
        },
    });

    useEffect(() => {
        makeOrderAncorRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
        });
    }, [isMakeOrder]);

    const makeOrderAncorRef = useRef<HTMLDivElement>(null);

    return (
        <div className={classes.wrapper} style={isMakeOrder ? { display: 'block' } : { display: 'none' }}>
            <form onSubmit={formik.handleSubmit} className={classes.form}>
                <div className={classes.orderDetailsBlocks}>
                    <ShippingBlock formik={formik} />
                    <PaymentBlock formik={formik} />
                </div>
                <div className={classes.controlsBlock}>
                    <div className={classes.totalPrice}>
                        <div>
                            Subtotal: <span>${totalPrice}</span>
                        </div>
                        <div>
                            Shipping:
                            <span>
                                {formik.values.shipping === 'withoutDelivery' ? (
                                    <span style={{ color: 'red' }}> FREE</span>
                                ) : (
                                    ` $${shippingCost}`
                                )}
                            </span>
                        </div>
                        <div>
                            Total:{' '}
                            <span>
                                $
                                {(
                                    +totalPrice + (formik.values.shipping === 'deliveryToClient' ? shippingCost : 0)
                                ).toFixed(2)}
                            </span>
                        </div>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
                            style={{ marginTop: '15px' }}
                            onClick={formik.submitForm}
                        >
                            Order
                        </Button>
                    </div>
                </div>
            </form>

            <MessageSendModal isMessageSend={isMessageSend} />
            <div ref={makeOrderAncorRef} />
        </div>
    );
});

export interface FormValues {
    city: string;
    shipping: string;
    pickupPoint: string;
    payment: string;
    street: string;
    home: string;
    floor: string;
    flat: string;
    deliveryTime: string;
    phone: string;
    textMessage: string;
}

type FormikErrorType = {
    city?: string;
    street?: string;
    home?: string;
    deliveryTime?: string;
    phone?: string;
    textMessage?: string;
};
