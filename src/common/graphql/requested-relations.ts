import {
  GraphQLResolveInfo,
  Kind,
  SelectionNode,
  type FragmentDefinitionNode,
} from 'graphql';

export type ProfileRelation = 'links' | 'skills' | 'experience' | 'projects';

const PROFILE_RELATIONS: ProfileRelation[] = [
  'links',
  'skills',
  'experience',
  'projects',
];

export function requestedProfileRelations(
  info: GraphQLResolveInfo,
): ProfileRelation[] {
  const fields = collectFieldNames(info);
  return PROFILE_RELATIONS.filter((relation) => fields.has(relation));
}

function collectFieldNames(info: GraphQLResolveInfo): Set<string> {
  const names = new Set<string>();

  for (const fieldNode of info.fieldNodes) {
    if (fieldNode.selectionSet) {
      walkSelections(
        fieldNode.selectionSet.selections,
        info.fragments,
        names,
      );
    }
  }

  return names;
}

function walkSelections(
  selections: readonly SelectionNode[],
  fragments: Record<string, FragmentDefinitionNode>,
  names: Set<string>,
): void {
  for (const selection of selections) {
    if (selection.kind === Kind.FIELD) {
      if (selection.name.value !== '__typename') {
        names.add(selection.name.value);
      }
      continue;
    }

    if (selection.kind === Kind.INLINE_FRAGMENT && selection.selectionSet) {
      walkSelections(selection.selectionSet.selections, fragments, names);
      continue;
    }

    if (selection.kind === Kind.FRAGMENT_SPREAD) {
      const fragment = fragments[selection.name.value];
      if (fragment) {
        walkSelections(fragment.selectionSet.selections, fragments, names);
      }
    }
  }
}
