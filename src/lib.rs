#[derive(Debug)]
pub enum PersonId {
    Passport(String),
    IdentityCard(String),
}