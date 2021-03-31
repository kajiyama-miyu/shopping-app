import React, { useState, useCallback, useEffect } from "react";
import { TextInput } from "../CommonParts/index";
import {
  FormControl,
  InputAdornment,
  Grid,
  makeStyles,
  Button,
  createStyles,
  FormHelperText,
  Typography,
} from "@material-ui/core";
import { DeriveryTimeRadio, PaymentRadio } from "../products/index";
import axios from "axios";
import { OrderProducts } from "../../reducks/products/type";
import { sanitazeZipCode } from "../../service/address";
import { formValidation } from "../../service/validation";
import { UserInfo } from "../../reducks/user/type";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import dayjs from "dayjs";

// ローカライズ（日本時刻を指定）
import "dayjs/locale/ja";

dayjs.locale("ja");

// init（現在時刻でdayjsのインスタンスを作成）
const day = dayjs();

export type Props = {
  handleOrder: (orders: OrderProducts) => void;
  total_price: number;
};

export type Payment = {
  payment_method: number;
};
export type OrderDate = {
  order_date: dayjs.Dayjs | null;
};
export type OrderTime = {
  delivery_time: number;
};

type Form = {
  destination_name: string;
  destination_email: string;
  destination_zipcode: string;
  prefecture: string;
  city: string;
  restAddress: string;
  destination_tel: string;
};

type ErrorMessage = {
  destination_name: string;
  destination_email: string;
  destination_zipcode: string;
  prefecture: string;
  city: string;
  restAddress: string;
  destination_tel: string;
  order_date: string;
  delivery_time: string;
  payment_method: string;
};

type FormInfo = {
  info: Form;
};

type Message = {
  message: ErrorMessage;
};

const useStyles = makeStyles((theme) =>
  createStyles({
    spaceSmall: {
      height: "12px",
    },
    button: {
      backgroundColor: theme.palette.grey["300"],
      fontSize: 16,
      marginBottom: 16,
    },
    errorColor: {
      color: "red",
    },
    spaceMedium: {
      height: "32px",
    },
    formStyle: {
      margin: "0rem auto",
      maxWidth: "400px",
      height: "auto",
      width: "calc(100% - 2rem)",
    },
    orderBox: {
      display: "flex",
      border: "1px solid rgba(0,0,0,0.2)",
      borderRadius: 4,
      height: 800,
      margin: "24px auto 16px auto",
      padding: 16,
      width: 380,
    },
    buttonStyle: {
      backgroundColor: "#33CCFF",
      color: "#000",
      fontSize: 16,
      height: 48,
      marginBottom: 16,
      width: 256,
    },
    headline: {
      color: "#33CCFF",
      fontSize: "1.563rem",
      margin: "0 auto 1rem auto",
    },
    payment: {
      border: "1px solid rgba(0,0,0,0.2)",
      borderRadius: 4,
      height: 50,
      margin: "24px auto 16px auto",
      padding: 16,
      width: 380,
    },
  })
);

const UserForm: React.FC<Props> = (props) => {
  const { handleOrder, total_price } = props;
  const classes = useStyles();
  const [order_date, setDeliveryDate] = useState<dayjs.Dayjs | null>(dayjs()),
    [delivery_time, setTime] = useState(0),
    [payment, setPayment] = useState(0),
    [form, setForm] = useState<FormInfo>({
      info: {
        destination_name: "",
        destination_email: "",
        destination_zipcode: "",
        prefecture: "",
        city: "",
        restAddress: "",
        destination_tel: "",
      },
    }),
    [error, setError] = useState<Message>({
      message: {
        destination_name: "",
        destination_email: "",
        destination_zipcode: "",
        prefecture: "",
        city: "",
        restAddress: "",
        destination_tel: "",
        order_date: "",
        delivery_time: "",
        payment_method: "",
      },
    }),
    [status, setStatus] = useState(0);

  const handleChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name;
    const value = event.target.value;

    setForm({
      info: { ...form.info, [key]: value },
    });
    setError({
      message: {
        ...error.message,
        [key]: formValidation(key, value),
      },
    });
  };

  const handleAutoAddress = async () => {
    if (!form.info.destination_zipcode) return;

    const result = await axios
      .get(
        `https://apis.postcode-jp.com/api/v3/postcodes?apikey=[O8KWhVnnSYBpMmYgK28IBYOdBAP25YvivftDvdx]&postcode=${sanitazeZipCode(
          form.info.destination_zipcode
        )}`
      )
      .then((res) => res.data)
      .catch(() =>
        alert("その郵便番号は存在しません。正しい郵便番号を入力してください")
      );

    const preKey = "prefecture";
    const cityKey = "city";
    const restKey = "restAddress";

    setForm({
      info: {
        ...form.info,
        [preKey]: result.data[0].pref,
        [cityKey]: result.data[0].city,
        [restKey]: result.data[0].town,
      },
    });
  };

  const handleSetUser = async () => {
    // if (!form.info.destination_name) return;

    const result = await axios.get<UserInfo>(
      "http://35.73.116.71/api/auth/user/",
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    const nameKey = "destination_name";
    const emailKey = "destination_email";
    const zipKey = "destination_zipcode";
    const preKey = "prefecture";
    const cityKey = "city";
    const restKey = "restAddress";
    const telKey = "destination_tel";

    const address = await axios
      .get(
        `https://apis.postcode-jp.com/api/v3/postcodes?apikey=[O8KWhVnnSYBpMmYgK28IBYOdBAP25YvivftDvdx]&postcode=${sanitazeZipCode(
          result.data.zipcode
        )}`
      )
      .then((res) => res.data)
      .catch(() =>
        alert("その郵便番号は存在しません。正しい郵便番号を入力してください")
      );

    setForm({
      info: {
        ...form.info,
        [nameKey]: result.data.name,
        [emailKey]: result.data.email,
        [zipKey]: result.data.zipcode,
        [preKey]: address.data[0].pref,
        [cityKey]: address.data[0].city,
        [restKey]: address.data[0].town,
        [telKey]: result.data.telephone,
      },
    });
  };

  const handleDateValue = useCallback(
    (value: Date) => {
      //   setDeliveryDate(event.target.value);
      let newDay = null;
      if (value != null) {
        newDay = dayjs(value);
      }

      setDeliveryDate(newDay);
    },
    [setDeliveryDate]
  );

  useEffect(() => {
    const currentYear = day.year();
    const orderYear = order_date!.year();
    const currentDate = day.date();
    const orderDate = order_date!.date();

    const dateKey = "order_date";

    if (orderYear - currentYear < 0) {
      setError({
        message: {
          ...error.message,
          [dateKey]: "今から３時間後の日時を選択してください",
        },
      });
    } else if (orderDate - currentDate < 0) {
      setError({
        message: {
          ...error.message,
          [dateKey]: "今から３時間後の日時を選択してください",
        },
      });
    } else {
      setError({
        message: {
          ...error.message,
          [dateKey]: "",
        },
      });
    }
  }, [order_date]);

  const handleDeliveryTime = useCallback(
    (event: number) => {
      const orderTime = event;

      setTime(orderTime);
    },
    [setTime]
  );

  useEffect(() => {
    const currentOrderTime = day.hour(delivery_time);

    const plusThreeHoure = day.add(3, "hour");

    const lastOrderTime = day.hour(20);
    const currentDate = day.date();
    const orderDate = order_date!.date();
    const TimeKey = "delivery_time";

    if (orderDate - currentDate === 0) {
      if (lastOrderTime.diff(plusThreeHoure) < 0) {
        setError({
          message: {
            ...error.message,
            [TimeKey]: "最終注文時間を過ぎています",
          },
        });
      } else if (currentOrderTime.diff(plusThreeHoure) < 0) {
        setError({
          message: {
            ...error.message,
            [TimeKey]: "今から３時間後の日時を選択してください",
          },
        });
      } else {
        setError({
          message: {
            ...error.message,
            [TimeKey]: "",
          },
        });
      }
    } else {
      setError({
        message: {
          ...error.message,
          [TimeKey]: "",
        },
      });
    }
  }, [delivery_time]);

  const canSubmit = (): boolean => {
    const validInfo =
      Object.values(form.info).filter((value) => {
        return value === "";
      }).length === 0;
    const validMessage =
      Object.values(error.message).filter((value) => {
        return value === "";
      }).length === 0;
    return validInfo || validMessage;
  };

  useEffect(() => {
    if (payment === 1) {
      setStatus(1);
    } else if (payment === 2) {
      setStatus(2);
    }
  }, [payment]);

  const onSubmit = () => {
    handleOrder({
      destination_name: form.info.destination_name,
      destination_email: form.info.destination_email,
      destination_zipcode: form.info.destination_zipcode,
      destination_address:
        form.info.prefecture + form.info.city + form.info.restAddress,
      destination_tel: form.info.destination_tel,
      order_date: `${order_date!.year()}-${
        order_date!.month() + 1
      }-${order_date!.date()}`,
      delivery_time: `${order_date!.year()}-${
        order_date!.month() + 1
      }-${order_date!.date()} ${delivery_time}:00:00`,
      payment_method: payment,
      status: status,
      total_price: total_price,
    });
  };

  return (
    <>
      <Grid container spacing={0} alignItems="center" justify="center">
        <Typography component="h2" className={classes.headline}>
          お届け先情報
        </Typography>
      </Grid>
      <div className={classes.formStyle}>
        <div className={classes.orderBox}>
          <div>
            <TextInput
              fullwidth={true}
              label={"ユーザー名"}
              name={"destination_name"}
              multiline={false}
              required={true}
              rows={1}
              type={"text"}
              value={form.info.destination_name}
              helperText={
                error.message.destination_name && error.message.destination_name
              }
              onChange={(e) => handleChangeForm(e)}
              autoComplete={"off"}
              FormHelperTextProps={{ className: classes.errorColor }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      variant="contained"
                      size="small"
                      className={classes.button}
                      onClick={() => {
                        handleSetUser();
                      }}
                    >
                      ユーザー情報セット
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
            <TextInput
              fullwidth={true}
              label={"メールアドレス"}
              multiline={false}
              name={"destination_email"}
              required={true}
              rows={1}
              type={"email"}
              value={form.info.destination_email}
              helperText={
                error.message.destination_email &&
                error.message.destination_email
              }
              onChange={(e) => handleChangeForm(e)}
              FormHelperTextProps={{ className: classes.errorColor }}
              autoComplete={"off"}
            />
            <TextInput
              fullwidth={true}
              label={"郵便番号"}
              name={"destination_zipcode"}
              multiline={false}
              required={true}
              rows={1}
              type={"text"}
              value={form.info.destination_zipcode}
              helperText={
                error.message.destination_zipcode &&
                error.message.destination_zipcode
              }
              onChange={(e) => handleChangeForm(e)}
              autoComplete={"off"}
              FormHelperTextProps={{ className: classes.errorColor }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      variant="contained"
                      size="small"
                      className={classes.button}
                      onClick={() => {
                        handleAutoAddress();
                      }}
                    >
                      住所検索
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
            <TextInput
              fullwidth={true}
              label={"住所（都道府県）"}
              name={"prefecture"}
              multiline={false}
              required={true}
              rows={1}
              type={"text"}
              value={form.info.prefecture}
              helperText={error.message.prefecture && error.message.prefecture}
              onChange={(e) => handleChangeForm(e)}
              FormHelperTextProps={{ className: classes.errorColor }}
              autoComplete={"off"}
            />
            <TextInput
              fullwidth={true}
              label={"住所（市区町村）"}
              name={"city"}
              multiline={false}
              required={true}
              rows={1}
              type={"text"}
              value={form.info.city}
              helperText={error.message.city && error.message.city}
              onChange={(e) => handleChangeForm(e)}
              FormHelperTextProps={{ className: classes.errorColor }}
              autoComplete={"off"}
            />
            <TextInput
              fullwidth={true}
              label={"住所（その他住所）"}
              name={"restAddress"}
              multiline={false}
              required={true}
              rows={1}
              type={"text"}
              value={form.info.restAddress}
              helperText={
                error.message.restAddress && error.message.restAddress
              }
              onChange={(e) => handleChangeForm(e)}
              autoComplete={"off"}
              FormHelperTextProps={{ className: classes.errorColor }}
            />
            <TextInput
              fullwidth={true}
              label={"電話番号（ハイフンなし）"}
              name={"destination_tel"}
              multiline={false}
              required={true}
              rows={1}
              type={"text"}
              value={form.info.destination_tel}
              helperText={
                error.message.destination_tel && error.message.destination_tel
              }
              onChange={(e) => handleChangeForm(e)}
              autoComplete={"off"}
              FormHelperTextProps={{ className: classes.errorColor }}
            />
            <div className={classes.spaceSmall} />
            <FormControl component="fieldset" fullWidth>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  value={order_date}
                  onChange={(d) => handleDateValue(d!)}
                  variant="inline"
                  name="order_date"
                  format="yyyy年M月d日"
                  animateYearScrolling
                  disableToolbar
                  label="配達時間"
                  fullWidth
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                  FormHelperTextProps={{ className: classes.errorColor }}
                />
              </MuiPickersUtilsProvider>
              <Grid container justify="center">
                <FormHelperText className={classes.errorColor}>
                  {error.message.order_date}
                </FormHelperText>
              </Grid>
            </FormControl>
            <div className={classes.spaceSmall} />
            <Grid container justify="center">
              <DeriveryTimeRadio
                handleDeliveryTime={handleDeliveryTime}
                helperText={error.message.delivery_time}
                name={"delivery_time"}
              />
            </Grid>
          </div>
        </div>
      </div>
      <div className={classes.spaceMedium} />
      <Grid container spacing={0} alignItems="center" justify="center">
        <Typography component="h2" className={classes.headline}>
          お支払い方法
        </Typography>
      </Grid>
      <div className={classes.payment}>
        <PaymentRadio setPayment={setPayment} name={"payment_method"} />
      </div>
      <div className={classes.spaceMedium} />
      <Grid container spacing={0} alignItems="center" justify="center">
        <Grid item>
          <Button
            className={classes.buttonStyle}
            disabled={!canSubmit()}
            onClick={() => onSubmit()}
            variant="outlined"
            fullWidth
          >
            この内容で注文する
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default UserForm;
