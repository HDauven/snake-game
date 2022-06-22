use std::fmt;

pub trait Log {
    fn display_info(&self);
}

pub enum PersonId {
    Passport(String),
    IdentityCard(String, String, String),
}

impl fmt::Display for PersonId {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            PersonId::Passport(x) => {
                write!(f, "{}", x)
            }
            PersonId::IdentityCard(x, y, z) => {
                write!(f, "{} {} {}", x, y, z)
            }
        }
    }
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
        println!("{} {} {} {}", self.name, self.last_name, self.age, self.id);
    }
}

impl Person {
    // constructor
    pub fn from(name: String, last_name: String, age: u32, id: PersonId) -> Person {
        Person {
            name,
            last_name,
            age,
            id,
        }
    }

    // associated function
    pub fn print_type() {
        println!("Person");
    }

    // method
    pub fn change_age(&mut self, new_age: u32) {
        self.age = new_age;
    }
}

pub fn log_info(val: impl Log) {
    val.display_info();
}
