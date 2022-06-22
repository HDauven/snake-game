use snake_game::{Animal, Log, Person, PersonId};

fn main() {
    let mut person = Person::from(
        String::from("Alan"),
        String::from("Turing"),
        27,
        PersonId::IdentityCard(String::from("SO"), String::from("LB"), String::from("SOO")),
    );

    person.change_age(28);

    Person::print_type();
    person.display_info();

    let animal = Animal("dog".to_string());
    animal.display_info();
}
