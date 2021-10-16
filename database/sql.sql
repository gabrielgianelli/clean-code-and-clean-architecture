create schema ccca;

create table ccca.item (id serial primary key, description varchar(100) not null, price numeric, width numeric, depth numeric, height numeric, weight numeric);

insert into ccca.item(description, price, width, depth, height, weight) values('PlayStation 5', 4300, 50, 50, 20, 3);
insert into ccca.item(description, price, width, depth, height, weight) values('Nintendo Switch', 2300, 40, 40, 15, 0.9);
insert into ccca.item(description, price, width, depth, height, weight) values('Notebook', 6700, 50, 40, 10, 2);

create table ccca.voucher (name text primary key, percentage numeric, expire_date timestamp);

insert into ccca.voucher values ('VALE10', 10, '2099-10-10T10:00:00');
insert into ccca.voucher values ('VALE10EXPIRADO', 10, '2020-10-10T10:00:00');

create table ccca.order (id serial, voucher text, code text, cpf text, issue_date timestamp, shipping_cost numeric,  primary key (id));

create table ccca.order_item (id_order integer, id_item integer, price numeric, width numeric, depth numeric, height numeric, weight numeric, quantity integer, primary key (id_order, id_item));

insert into ccca.order (id, code, cpf, issue_date) values (1, '202100000001', '89207883082', '2021-10-11T10:00:00');
insert into ccca.order_item (id_order, id_item, price, width, depth, height, weight, quantity) values (1, 1, 4300, 50, 50, 20, 3, 1);