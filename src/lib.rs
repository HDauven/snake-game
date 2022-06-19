pub trait Log {
    fn display_info(&self);
}

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

impl Log for Animal {
    fn display_info(&self) {
        println!("{}", self.0);
    }
}

impl Log for Person {
    fn display_info(&self) {
        println!(
            "{} {} {} {:?}",
            self.name, self.last_name, self.age, self.id
        );
    }
}
