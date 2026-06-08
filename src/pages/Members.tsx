import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import MemberCard from '../components/members/MemberCard'
import LoadingSpinner from '../components/common/LoadingSpinner'
import ErrorMessage from '../components/common/ErrorMessage'
import { useDataStore } from '../store/dataStore'

export default function Members() {
  const { t, i18n } = useTranslation()
  const members = useDataStore((state) => state.members)
  const membersLoading = useDataStore((state) => state.membersLoading)
  const membersError = useDataStore((state) => state.membersError)
  const fetchMembers = useDataStore((state) => state.fetchMembers)

  useEffect(() => {
    fetchMembers()
  }, [fetchMembers])

  const representative = members[0]
  const researchers = members.slice(1)
  const isEnglish = i18n.language.startsWith('en')
  const getMemberCardProps = (member: (typeof members)[number]) => ({
    name: isEnglish ? member.nameEn ?? member.name : member.name,
    role: isEnglish ? member.roleEn ?? member.role : member.role,
  })

  return (
    <div className="space-y-12">
      <section className="space-y-6">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">
            {t('people.kicker')}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
            {t('people.title')}
          </h1>
          <p className="max-w-2xl text-lg text-slate-600">{t('people.description')}</p>
        </div>
      </section>

      {membersLoading && <LoadingSpinner />}
      {membersError && <ErrorMessage error={membersError} retry={fetchMembers} />}
      {!membersLoading && !membersError && (
        <div className="space-y-14">
          {representative && (
            <section id="pi" className="scroll-mt-32 space-y-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">01</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                  {t('people.representative')}
                </h2>
              </div>
              <div className="max-w-sm">
                <MemberCard {...getMemberCardProps(representative)} />
              </div>
            </section>
          )}

          <section id="current-members" className="scroll-mt-32 space-y-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">02</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                {t('people.researchers')}
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {researchers.map((member) => (
                <MemberCard key={member.id} {...getMemberCardProps(member)} />
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
