locals {
  repository = "tdd-practice"

  direct_collaborators = {
    cl-r-yamamoto    = "admin"
    cl-k-okazaki     = "admin"
    cl-ko-sato-code  = "admin"
    cl-s-takahashi   = "admin"
    e-otsuki         = "admin"
    m-yamada-cl      = "maintain"
    cl-ri-maeno      = "maintain"
    cl-s-furutani    = "maintain"
    cl-r-kashiwabara = "maintain"
  }
}

resource "github_repository_collaborator" "direct" {
  for_each = local.direct_collaborators

  repository = local.repository
  username   = each.key
  permission = each.value
}

resource "github_repository_ruleset" "main" {
  name        = "main direct push protection"
  repository  = local.repository
  target      = "branch"
  enforcement = "active"

  bypass_actors {
    actor_type  = "OrganizationAdmin"
    bypass_mode = "always"
  }

  conditions {
    ref_name {
      include = ["refs/heads/main"]
      exclude = []
    }
  }

  rules {
    deletion = true
    update   = true
  }
}
