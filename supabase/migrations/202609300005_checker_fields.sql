alter table public.requirements
  drop constraint if exists requirements_field_check;

alter table public.requirements
  add constraint requirements_field_check check (
    field is null or field in (
      'role', 'format', 'country', 'region', 'age', 'identityMatch',
      'rights', 'english', 'aiUsed', 'previouslyPublished', 'genreFit',
      'audienceFit', 'samplePages', 'storyPages', 'script', 'synopsis',
      'bio', 'portfolio', 'collaborator', 'teamRoles', 'fileFormat', 'dpi',
      'colorMode', 'dimensionsReady', 'pdf'
    )
  );
