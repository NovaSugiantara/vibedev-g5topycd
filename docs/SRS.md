# Software Requirements Specification

# Stack

Simple frontend only

- HTML
- Tailwind CSS (CDN)
- Alpine.js (CDN)
- Vanilla JavaScript

No build process required.

---

# Functional Requirements

## Yarn Entries

Each yarn entry contains

- Skein name
- Yards per skein
- Number of skeins

Users can

- Add entry
- Edit inline
- Delete entry

---

## Totals

Automatically calculate

Total Available Yardage

Formula

yards per skein × skein count

summed across all entries

---

## Project Requirement

Single numeric input

Required Project Yardage

---

## Result

Display

Total Available

Required

Difference

---

## Status

Green

Enough yarn

Difference >= 0

---

Yellow

Within 10% shortage

Required - Available <= 10%

---

Red

Need more yarn

Shortage greater than 10%

---

## Calculations

Update instantly after every change.

No submit button.

---

# Non Functional Requirements

Responsive

Accessible

Fast

Simple

No external API

No persistence

No authentication
