
create table notes (
    id serial primary key,
    owner_id uuid not null REFERENCES auth.users(id),
    title text not null,
    content text not null,
    created_at timestamp not null default now()
);

create table note_tags (
    id serial primary key,
    note_id int not null REFERENCES notes(id),
    tag_slug text not null REFERENCES tags(slug),
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
    ('d74d85cf-cb95-4f68-8675-4c4e6082e26a', 'Personal Note', 'This is a personal note'),
    ('d74d85cf-cb95-4f68-8675-4c4e6082e26a', 'Work Note', 'This is a work note'),
    ('d74d85cf-cb95-4f68-8675-4c4e6082e26a', 'Family Note', 'This is a family note'),
    ('d74d85cf-cb95-4f68-8675-4c4e6082e26a', 'Friends Note', 'This is a friends note'),
    ('d74d85cf-cb95-4f68-8675-4c4e6082e26a', 'Other Note', 'This is a other note');

insert into note_tags (note_id, tag_slug) values
    (1, 'personal'),
    (1, 'work'),
    (1, 'family'),
    (1, 'friends'),
    (1, 'other');