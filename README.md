[![CircleCI](https://dl.circleci.com/status-badge/img/gh/bshepeliuk/marketplace-client/tree/main.svg?style=svg&circle-token=9afda076bece2040da00c19663b5d44049004489)](https://dl.circleci.com/status-badge/redirect/gh/bshepeliuk/marketplace-client/tree/main) &nbsp; [![codecov](https://codecov.io/gh/bshepeliuk/marketplace-client/branch/main/graph/badge.svg?token=HL2ALLQND0)](https://codecov.io/gh/bshepeliuk/marketplace-client)

## Cards for testing.

| BRAND        | NUMBER           | CVC          | DATE            |
| ------------ | ---------------- | ------------ | --------------- |
| Visa         | 4242424242424242 | Any 3 digits | Any future date |
| Visa (debit) | 4000056655665556 | Any 3 digits | Any future date |
| Mastercard   | 5555555555554444 | Any 3 digits | Any future date |
|              |                  |              |                 |

## Users for testing.

| EMAIL             | PASSWORD | ROLE   |
| ----------------- | -------- | ------ |
| john@wick.io      | 1234     | SELLER |
| tony@stark.io     | 1234     | SELLER |
| albus@dambldor.io | 1234     | BUYER  |
| leam@neeson.io    | 1234     | BUYER  |
|                   |          |        |

## Implemented features.

Payment API

- It uses Stripe API for payment processing.

Registration and Authentication.

- The user can register as a BUYER or SELLER.
- The user is able to log in account.

Profile.

- The user is able to get details about account.
- The seller is able to create Stripe account.

Purchases.

- The buyer is able to get list of purchases.
- The buyer is able to check status of purchases.
- The buyer is able to filter purchases by status, id, month, year and device name.
- The buyer is able to sort purchases by date.

Orders.

- The seller is able to get list of orders.
- The seller is able to change status of order.
- The seller is able to filter orders by status, year, month, id, phone and device name.
- The seller is able to sort orders by customer and date.

Statistics

- The seller is able to obtain statistics from devices, orders and customers.
- The seller is able to filter statistics by month and year.
- The seller is able to get full information about day, month and hour of orders.
- The seller is able to obtain statistics by orders cities.
- The seller is able to get statistics by device categories

Money movement.

- The seller is able to get details of charges, payouts and transfers.
- The seller is able to get information about pending and available money.

Comments.

- The user is able to get list of device comments.
- The buyer is able to add, delete or edit a comment.
- The buyer is able to add a reply to comment.

Comparison.

- The user is able to add devices to comparison.
- The user is able sort rows and columns of comparison table.

Recently viewed.

- The user is able to get list of recently viewed devices.

Cart

- The buyer is able to add devices to cart.
- The buyer is able to delete device from cart.
- The buyer is able to add to cart devices from different sellers and pay for it.

Devices

- The user is able to search devices by name.
- The seller is able to create a new device.
- The buyer is able to filter devices by features.
- The buyer is able to pay for devices.
- The buyer is able to evaluate device.
- The user is able to get details about device.
- The user is able to zoom device image.
- The user is able to filter devices by category.
