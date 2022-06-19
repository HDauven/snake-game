#[derive(Debug)]
pub enum PersonId {
    Passport(String),
    IdentityCard(String),
}

pub struct Person {
    name: String,
    last_name: String,
    age: u32,
    id: PersonId,
}

pub struct Animal(pub String);
