
create table notes (
    id serial primary key,
    owner_id int not null REFERENCES auth.users(id),
    title text not null,
    content text not null,
    created_at timestamp not null default now()
);

create table note_tags (
    id serial primary key,
    note_id int not null REFERENCES notes(id),
    tag_id int not null REFERENCES tags(id),
    created_at timestamp not null default now()
);

create table tags (
    slug text primary key,
    name text not null,
    created_at timestamp not null default now()
);

/* Contiuation of the notes app */

create table note_shares (
    id serial primary key,
    note_id int not null REFERENCES notes(id),
    shared_with int not null REFERENCES auth.users(id),
    created_at timestamp not null default now()
);

/* SEED DATA replace owner_id with the id of the user */

insert into tags (slug, name) values
    ('personal', 'Personal'),
    ('work', 'Work'),
    ('family', 'Family'),
    ('friends', 'Friends'),
    ('other', 'Other');

insert into notes (owner_id, title, content) values
    (1, 'Personal Note', 'This is a personal note'),
    (1, 'Work Note', 'This is a work note'),
    (1, 'Family Note', 'This is a family note'),
    (1, 'Friends Note', 'This is a friends note'),
    (1, 'Other Note', 'This is a other note');

insert into note_tags (note_id, tag_id) values
    (1, 1),
    (1, 2),
    (1, 3),
    (1, 4),
    (1, 5);