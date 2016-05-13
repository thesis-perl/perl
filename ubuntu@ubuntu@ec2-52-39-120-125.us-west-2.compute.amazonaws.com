

var dbconfig = {
 host: 'mysqlcluster10.registeredsite.com',
 user: 'perladmin',
 password: '#EDC4rfv',
 database: 'thesis_perl'
}

module.exports = dbconfig;