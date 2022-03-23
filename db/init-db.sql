CREATE TABLE IF NOT EXISTS jobOffer (
    id bigserial PRIMARY KEY,
    title VARCHAR (128) NOT NULL,
    address VARCHAR (128) NOT NULL,
    salary VARCHAR (128) NOT NULL,
    contract_type VARCHAR (128) NOT NULL,
    description TEXT NOT NULL,
    author VARCHAR (128) NOT NULL,
    created_at VARCHAR (128),
    updated_at VARCHAR (128),
);

