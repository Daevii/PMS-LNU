
# PMS-LNU (Payroll Management System For Lyceum-Northwestern University)

A Codeignter 4 and React Project For the Lyceum-Northwestern University.


## Installation

Install The Follwing Application To Run this MSFPD


- [XAMPP](https://www.apachefriends.org/download.html)
- [Composer](https://getcomposer.org/download/)

    
## Run Locally

### Download the zip file on
- [Github](https://github.com/Daevii/PMS-LNU) or [Google Drive](https://drive.google.com/file/d/1BoKLMG9zCcuVHlKvJxboacFhNEkua-8a/view?usp=sharing)

- #### Extract the Zip file
- Move the Extracted folder to htdocs

### Move the Folder to Xampp/htdocs folder
```bash
...
Local Disk
└── xammp
    └── htdocs
        └── (Move the Folder Here)
```

- #### Open Xampp Control Panel
- #### Start Apache and MySQL

## Insert the Database in the Localhost
### Download the SQL File 
- [Mediafire](https://www.mediafire.com/file/u1i798xic799x77/payrollmanagement.sql/file) 

### Import SQL Database 

#### Search localhost/phpmyadmin in Browser
- Open the Xamp application and start
```
- Apache
- MySQL
```

- Open a Web Browser and search localhost or click [phpmyadmin](http://localhost/dashboard/)

- #### Create Database named payrollmangement

- #### Import The SQL File to the Database

## Run Website

- #### Open Terminal
- #### Go To the Folder you made in the htdocs
- #### On the psm-boot folder

```bash
...
Local Disk
└── xammp
    └── htdocs
        └── pms-boot (go here)
        └── pms-coreui
```

 Run the command

```bash
php spark serve
```
- #### On the psm-coreui folder


```bash
...
Local Disk
└── xammp
    └── htdocs
        └── pms-boot
        └── pms-coreui (go here)
```


 Run the command

```bash
npm run dev
```


## Features

- Dashboard
- Attendance Check-in / Check-out
- Employee Table Information
- Payroll Benefits
- Payroll Deduction
- Tax Information and Tables
- Payroll Reports
- DataTables (Search and sort)
- Sweetalert Confirmations
- Admin Tables



## Used By

This project is used by the Lyceum-Northwestern University


## Authors

- [Santiago, Daevi](https://www.facebook.com/DCandE19)
## Accounts

### Admin
Name: admin

Password: asdasdasd