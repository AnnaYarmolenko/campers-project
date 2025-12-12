"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { enGB } from "date-fns/locale/en-GB";
import { registerLocale } from "react-datepicker";
import css from "./BookingDatePicker.module.css";


registerLocale("en-GB", enGB);

interface Props {
  name: string;
  placeholder?: string;
}

export default function BookingDatePicker({
  name,
  placeholder = "Booking date*",
}: Props) {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <div className={css.wrapper}>
      <input
        type="hidden"
        name={name}
        value={date ? date.toISOString().split("T")[0] : ""}
      />

      <DatePicker
        selected={date}
        onChange={(d) => setDate(d)}
        dateFormat="dd-MM-yyyy"
        placeholderText={placeholder}
        popperPlacement="bottom-start"
        locale="en-GB" 
        formatWeekDay={(nameOfDay) => nameOfDay.slice(0, 3).toUpperCase()}
        className={css.input}
        calendarClassName={css.calendar} 
        wrapperClassName={css.wrapper} 
        showPopperArrow={false}
      />
    </div>
  );
}
